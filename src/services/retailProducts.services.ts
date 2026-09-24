import { pool } from "../utils/db.js";
import type {
  CreateRetailProductsInput,
  UpdateRetailProductsInput,
} from "../schemas/retailProducts.schema.js";

export const createRetailProduct = async (data: CreateRetailProductsInput) => {
  const result = await pool.query(
    `
      INSERT INTO hossam.retail_products
        (name, category, price_per_kilo, stock_kg, producer_id)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      data.name,
      data.category,
      data.price_per_kilo,
      data.stock_kg,
      data.producer_id,
    ],
  );

  return result.rows[0];
};

export const getRetailProducts = async () => {
  const result = await pool.query(
    `
      SELECT
        RP.id,
        RP.name,
        RP.category,
        RP.price_per_kilo,
        RP.stock_kg,
        RP.producer_id,
        RP.created_at,
        RP.updated_at,
        -- Producer Details
        PR.name AS producer_name,
        PR.rating AS producer_rating,
        -- Phone Details
        CASE 
          WHEN PP.id IS NULL THEN 'no phone' 
          ELSE PP.id::text 
        END AS phone_id,
        CASE 
          WHEN PP.phone_number IS NULL THEN 'no phone' 
          ELSE '+20' || PP.phone_number::text 
        END AS phone
      FROM hossam.retail_products AS RP
      -- Correctly join the producers table first
      LEFT JOIN hossam.producers AS PR ON RP.producer_id = PR.id
      -- Then join the phones table using the producer's ID
      LEFT JOIN hossam.producer_phones AS PP ON PR.id = PP.producer_id
      ORDER BY PR.rating DESC NULLS LAST;
    `,
  );

  return result.rows;
};

export const getRetailProductById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM hossam.retail_products
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const updateRetailProduct = async (
  id: number,
  data: UpdateRetailProductsInput,
) => {
  const result = await pool.query(
    `
      UPDATE hossam.retail_products
      SET
        name = COALESCE($1, name),
        category = COALESCE($2, category),       -- Fixed: was 'rating'
        price_per_kilo = COALESCE($3, price_per_kilo), -- Fixed: was '$2'
        stock_kg = COALESCE($4, stock_kg),       -- Fixed: was '$2'
        producer_id = COALESCE($5, producer_id), -- Fixed: was '$2'
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `,
    [
      data.name ?? null,         // $1
      data.category ?? null,     // $2
      data.price_per_kilo ?? null, // $3
      data.stock_kg ?? null,     // $4
      data.producer_id ?? null,  // $5
      id,                        // $6
    ],
  );

  return result.rows[0] ?? null;
};

export const deleteRetailProduct = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM hossam.retail_products
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0] ?? null;
};