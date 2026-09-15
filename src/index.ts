import express from "express";
import { pool } from "./utils/db.js";
import {errorHandler} from './middleware/errorHandler.js';
import producerRoute from "./routes/producers.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT * from hossam.orders");
  console.log(result);

  res.json({
    message: result.rows,
  });
});

// --------------- routes -----------------------------
app.use('/producer',producerRoute);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
