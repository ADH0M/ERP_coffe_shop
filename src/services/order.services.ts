import { pool } from "../utils/db.js";
import type {
  CreateOrderSchema,
  UpdateOrderSchema,
} from "../schemas/orders.shcema.js";

// get all
const getOrderService = async () => {
  const orders = await pool.query(`
            SELECT 
                id ,
                customer_name,
                address,
                total_price,
                status,
                created_at  
            FROM hossam.orders
            ORDER BY created_at DESC;
        `);
  return orders.rows;
};

// create
const createOrderService = async (data: CreateOrderSchema) => {
  const client = await pool.connect();
  let totalPrice: number = 0.0;
  let orderItems = [];
  try {
    await pool.query("BEGIN");
    const { items, customer_name, address } = data;
    if (items.length <= 0 || !items) {
      throw new Error("يجب أن يحتوي الطلب على عنصر واحد على الأقل");
    }

    for (let item of items) {
      const { retail_product_id, beverage_id, quantity } = item;
      if (quantity <= 0) {
        throw new Error("يجب أن تكون الكمية أكبر من 0");
      }

      if (retail_product_id) {
        if (beverage_id) {
          throw new Error(
            "لا يمكن أن يحتوي العنصر على كل من معرف منتج البيع بالتجزئة ومعرف المشروب",
          );
        }

        const result = await pool.query(
          `SELECT
              price_per_kilo AS price, 
              id
          FROM 
              hossam.retail_products
          WHERE 
              id = $1`,
          [retail_product_id],
        );

        if (result.rows.length <= 0) {
          throw new Error(`لم يتم العثور على منتج البيع بالتجزئة`);
        }

        const product = result.rows[0];
        totalPrice += Number(product.price) * Number(quantity);
        orderItems.push({
          retail_product_id,
          beverage_id: null,
          unit_Pirce: product.price,
          quantity,
        });
      } else if (beverage_id) {
        const result = await pool.query(
          `
          SELECT id, price
          FROM hossam.beverages
          WHERE id = $1
          `,
          [beverage_id],
        );

        if (result.rows[0] <= 0) {
          throw new Error(`لم يتم العثور على المشروب ${beverage_id}`);
        }

        const beverage = result.rows[0];
        totalPrice += Number(beverage.price) * Number(quantity);

        orderItems.push({
          beverage_id,
          retail_product_id: null,
          unitPrice: beverage.price,
          quantity,
        });
      } else {
        throw new Error(
          "يجب أن يحتوي كل عنصر إما على معرف منتج البيع بالتجزئة أو معرف المشروب",
        );
      }
    }

    const orderResult = await pool.query(
      `
      INSERT INTO hossam.orders
        (customer_name, address, total_price)
      VALUES
        ($1, $2, $3)
      RETURNING *
      `,
      [customer_name, address, totalPrice],
    );

    const order = orderResult.rows[0];
    console.log(order);
    
    for (let item of orderItems) {
      const { retail_product_id, beverage_id, quantity, unitPrice } = item;
       await pool.query(
        `
          INSERT INTO hossam.order_items
            (
              order_id,
              retail_product_id,
              beverage_id,
              quantity,
              unit_price
            )
          VALUES 
            (
              $1,$2,$3,$4,$5
            )
        `,
        [order.id, retail_product_id, beverage_id, quantity, unitPrice],
      );
    }
    await pool.query("COMMIT");
    return { order, orderItems };

  } catch (error: unknown) {
    await client.query("ROLLBACK");
    if (error instanceof Error) {
      throw new Error("from create order " + error.message);
    } else {
      throw new Error("unexpected error from create order");
    }
  } finally {
    client.release();
  }
};

// get by id
const getOrderByIdService = async (id: number) => {
  const order = await pool.query(
    `
        SELECT Ord.id , Ord.customer_name, Ord.address,Ord.total_price,Ord.status,
        OI.id AS orderItemId, OI.quantity, OI.unit_price
        FROM hossam.orders AS Ord INNER JOIN hossam.order_items AS OI
        ON Ord.id = OI.order_id AND Ord.id =$1;
        `,
    [id],
  );
  return order.rows[0] ?? null;
};

// update by id
const updateOrderService = async (id: number, data: UpdateOrderSchema) => {
  const result = await pool.query(
    `
      UPDATE hossam.orders
      SET  
        customer_name = COALESCE($1, customer_name), 
        address= COALESCE($2, address), 
        status= COALESCE($3, status),
        updated_at = CURRENT_TIMESTAMP      
      WHERE id = $4
      RETURNING *                           
    `,
    [
      data.customer_name ?? null, // $1
      data.address ?? null, // $2
      data.status ?? null, // $3
      id, // $4
    ],
  );

  return result.rows[0] ?? null;
};

// delete by id
const deleteOrderService = async (id: number) => {
  const result = await pool.query(
    `   
        DELETE FROM hossam.orders
        WHERE id =$1
        RETURNING
        id ;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export {
  getOrderService,
  getOrderByIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
};
