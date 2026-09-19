import { pool } from "../utils/db.js";
import type {
  CreateProducerInput,
  UpdateProducerInput,
} from "../schemas/producer.schema.js";

export const createProducer = async (
  data: CreateProducerInput,
) => {
  const result = await pool.query(
    `
      INSERT INTO hossam.producers
        (name, rating)
      VALUES
        ($1, COALESCE($2, 4.0))
      RETURNING
        id,
        name,
        rating,
        created_at,
        updated_at
    `,
    [data.name, data.rating ?? null],
  );

  return result.rows[0];
};

export const getProducers = async () => {
  const result = await pool.query(
    `
      SELECT
        P.id AS producer_id,
        P.name,
        P.rating,
        P.created_at,
          CASE WHEN PP.id IS NULL THEN 'no phone' ELSE PP.id::text END AS phone_id,
          CASE WHEN PP.phone_number IS NULL THEN 'no phone' ELSE '+20'||''|| PP.phone_number::text END as phone
      FROM hossam.producers AS P
      LEFT JOIN hossam.producer_phones AS PP
      ON P.id = PP.producer_id
      ORDER BY P.rating DESC ;
    `,
  );

  return result.rows;
};

export const getProducerById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        rating,
        created_at,
        updated_at
      FROM hossam.producers
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const updateProducer = async (
  id: number,
  data: UpdateProducerInput,
) => {
  const result = await pool.query(
    `
      UPDATE hossam.producers
      SET
        name = COALESCE($1, name),
        rating = COALESCE($2, rating),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING
        id,
        name,
        rating,
        created_at,
        updated_at
    `,
    [
      data.name ?? null,
      data.rating ?? null,
      id,
    ],
  );

  return result.rows[0] ?? null;
};

export const deleteProducer = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM hossam.producers
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0] ?? null;
};
