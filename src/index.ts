import express from "express";
import { pool } from "./utils/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import producerRoute from "./routes/producers.route.js";
import retailProductRoute from "./routes/retailProduct.route.js";
import beverages from "./routes/beverages.route.js";
import orders from "./routes/order.route.js";
import orderItems from "./routes/orderItems.route.js";

const app = express();
const PORT = 3000;

app.set("trust proxy", true);
app.use(express.json());

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT * from hossam.orders");

  res.status(200).json({
    message: result.rows,
  });
});

// --------------- routes -----------------------------
app.use("/producer", producerRoute);
app.use("/retailProduct", retailProductRoute);
app.use("/beverages", beverages);
app.use("/orders", orders);
app.use("/orderItems", orderItems);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
