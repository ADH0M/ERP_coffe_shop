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
  const order = await pool.query(
    `
        INSERT INTO hossam.orders 
        (customer_name, address,total_price,status)
        VALUES ($1,$2,$3,$4)
        RETURNING 
        id ,customer_name, address,total_price,status;
        `,
    [
      data.customer_name ?? null,
      data.address ?? null,
      data.total_price,
      data.status,
    ],
  );
  return order.rows;
};

// get by id
const getOrderByIdService = async (id: number) => {
  const order = await pool.query(
    `
        SELECT id , customer_name, address,total_price,status
        FROM hossam.orders
        WHERE id =$1;
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
        total_price= COALESCE($3, total_price),
        status= COALESCE($4, status),
        updated_at = CURRENT_TIMESTAMP      
      WHERE id = $5
      RETURNING *                           
    `,
    [
      data.customer_name ?? null,   // $1
      data.address ?? null,         // $2
      data.total_price ?? null,     // $3
      data.status ?? null,          // $4
      id,                           // $5
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
