import { pool } from "../utils/db.js";
import type {
  CreateOrderItemSchema,
  UpdateOrderItemSchema,
} from "../schemas/order_items.schema.js";
// get all
const getOrderItemsService = async () => {
  const orders = await pool.query(`
            SELECT * FROM hossam.order_items
        `);
  return orders.rows;
};

// create
const createOrderItemService = async (data: CreateOrderItemSchema) => {
  const order = await pool.query(
    `
        INSERT INTO hossam.order_items 
        (order_id,retail_product_id,beverage_id,quantity,unit_price)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING 
                id ,
                order_id,
                retail_product_id,
                beverage_id,
                quantity,
                unit_price; 
        `,
    [
      data.order_id ,
      data.retail_product_id,
      data.beverage_id,
      data.quantity,
      data.unit_price,

    ],
  );
  return order.rows;
};

// get by id
const getOrderItemByIdService = async (id: number) => {
  const order = await pool.query(
    `
        SELECT *
        FROM hossam.order_items
        WHERE id =$1;
        `,
    [id],
  );
  return order.rows[0] ?? null;
};

// update by id
const updateOrderItemService = async (id: number, data: UpdateOrderItemSchema) => {
  const result = await pool.query(
    `
      UPDATE hossam.order_items
      SET  
        order_id = COALESCE($1, order_id), 
        retail_product_id= COALESCE($2, retail_product_id), 
        beverage_id= COALESCE($3, beverage_id),
        quantity= COALESCE($4, quantity),
        unit_price = COALESCE($5, unit_price)
      WHERE id =$6
      RETURNING *                           
    `,
    [
      data.order_id ?? null,                  // $1
      data.retail_product_id ?? null,         // $2
      data.beverage_id ?? null,               // $3
      data.quantity ?? null,                  // $4
      data.unit_price??null ,                 // $5
      id,                                     // $6
    ],
  );

  return result.rows[0] ?? null;
};

// delete by id
const deleteOrderItemService = async (id: number) => {
  const result = await pool.query(
    `   
        DELETE FROM hossam.order_items
        WHERE id =$1
        RETURNING
        id ;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export {
  getOrderItemsService,
  getOrderItemByIdService,
  createOrderItemService,
  updateOrderItemService,
  deleteOrderItemService,
};
