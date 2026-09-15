import type { NextFunction, Request, Response } from "express";
import { pool } from "../utils/db.js";
import { successResponse } from "../utils/responses.js";

const getAllProducers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = process.env.DB_SCHEMA || "hossam";
    console.log(schema);
    
    const producers =await pool.query(
      `SELECT P.id ,P.name,P.rating ,P.created_at ,PP.phone_number 
       FROM ${schema}.producers AS P 
       INNER JOIN ${schema}.producer_phones AS PP 
       ON P.id=PP.producer_id`,
    );
    return successResponse(res,200,producers.rows)
  } catch (error: unknown) {
    next(error);
  }
};

export { getAllProducers };
