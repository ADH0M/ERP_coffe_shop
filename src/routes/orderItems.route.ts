import { Router } from "express";
import {
  createOrderItemController,
  deleteOrderItemController,
  getOrderItemByIdController,
  getOrderItemsController,
  updateOrderItemController,
} from "../controller/orderItems.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  orderItemIdSchema,
  createOrderItemSchema,
  updateOrderItemSchema,
} from "../schemas/order_items.schema.js";
const route: Router = Router();

// get all
route.get("/", asyncHandler(getOrderItemsController));

// create
route.post(
  "/",
  validateBody(createOrderItemSchema),
  asyncHandler(createOrderItemController),
);

// get by id 
route.get(
  "/:id",
  validateParams(orderItemIdSchema),
  asyncHandler(getOrderItemByIdController),
);

// update
route.patch(
  "/:id",
  validateParams(orderItemIdSchema),
  validateBody(updateOrderItemSchema),
  asyncHandler(updateOrderItemController),
);

// delete
route.delete(
  "/:id",
  validateParams(orderItemIdSchema),
  asyncHandler(deleteOrderItemController),
);



export default route;
