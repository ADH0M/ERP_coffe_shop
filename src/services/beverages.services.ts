import { pool } from "../utils/db.js";
import type {
  CreateBeveragesSchema,
  UpdateBeveragesSchema,
} from "../schemas/breverages.shema.js";
// get all
const getBeveragesService = async () => {
  const berevages = await pool.query(`
            SELECT 
                id ,
                name ,
                drink_type   ,
                COALESCE(roast_level, 'غير محدد'),
                price        ,
                description  , 
                created_at  
            FROM hossam.beverages
            ORDER BY created_at DESC;
        `);
  return berevages.rows;
};

// create
const createBeverageService = async (data: CreateBeveragesSchema) => {
  const beverage = await pool.query(
    `
        INSERT INTO hossam.beverages 
        (name ,drink_type ,roast_level ,is_mahuj ,price ,description )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING 
        id , name ,drink_type ,roast_level ,is_mahuj ,price ,description ;
        `,
    [
      data.name,
      data.drink_type,
      data.roast_level ?? null,
      data.is_mahuj,
      data.price,
      data.description ?? null,
    ],
  );
  return beverage.rows;
};

// get by id
const getBeverageByIdService = async (id: number) => {
  const beverage = await pool.query(
    `
        SELECT id , name ,drink_type , COALESCE(roast_level, 'غير محدد') ,is_mahuj ,price ,description 
        FROM hossam.beverages
        WHERE id =$1;
        `,
    [id],
  );
  return beverage.rows[0] ?? null;
};

// update by id
const updateBeverageService = async (
  id: number,
  data: UpdateBeveragesSchema,
) => {
  const result = await pool.query(
    `
      UPDATE hossam.beverages
      SET  
        name = COALESCE($1, name), 
        drink_type = COALESCE($2, drink_type),
        roast_level = COALESCE($3, roast_level),
        is_mahuj = COALESCE($4, is_mahuj),
        price = COALESCE($5, price),
        description = COALESCE($6, description),
        updated_at = CURRENT_TIMESTAMP      
      WHERE id = $7
      RETURNING *                           
    `,
    [
      data.name ?? null, // $1
      data.drink_type ?? null, // $2
      data.roast_level ?? null, // $3
      data.is_mahuj ?? null, // $4
      data.price ?? null, // $5
      data.description ?? null, // $6
      id, // $7
    ],
  );

  return result.rows[0] ?? null;
};

// delete by id
const deleteBeverageService = async (id: number) => {
  const result = await pool.query(
    `   
        DELETE FROM hossam.beverages 
        WHERE id =$1
        RETURNING
        id ;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export {
  getBeveragesService,
  getBeverageByIdService,
  createBeverageService,
  updateBeverageService,
  deleteBeverageService,
};
