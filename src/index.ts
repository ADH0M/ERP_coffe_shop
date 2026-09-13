import express from "express";
import { pool } from "./utils/db.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT * from hossam.orders");
  console.log(result);

  res.json({
    message:result.rows,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
