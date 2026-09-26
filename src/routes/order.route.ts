import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController,
} from "../controller/order.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  orderIdSchema,
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/orders.shcema.js";
const route: Router = Router();

// get all
route.get("/", asyncHandler(getOrdersController));

// create
route.post(
  "/",
  validateBody(createOrderSchema),
  asyncHandler(createOrderController),
);

// get by id 
route.get(
  "/:id",
  validateParams(orderIdSchema),
  asyncHandler(getOrderByIdController),
);

// update
route.patch(
  "/:id",
  validateParams(orderIdSchema),
  validateBody(updateOrderSchema),
  asyncHandler(updateOrderController),
);

// delete
route.delete(
  "/:id",
  validateParams(orderIdSchema),
  asyncHandler(deleteOrderController),
);



export default route;
