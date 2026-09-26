import type { Request, Response, NextFunction } from "express";
import {
  createOrderItemService,
  deleteOrderItemService,
  getOrderItemByIdService,
  getOrderItemsService,
  updateOrderItemService,
} from "../services/orderItem.services.js";
import { errorResponse, successResponse } from "../utils/responses.js";

// get all
const getOrderItemsController = async (_req: Request, res: Response) => {
  const result = await getOrderItemsService();
  return successResponse(res, 200, result);
};

// create
const createOrderItemController = async (req: Request, res: Response) => {
  const result = await createOrderItemService(req.body);
  if (!result) errorResponse(res, 500, "Can not create order at this time.");
  return successResponse(res, 201, result);
};

// get by id
const getOrderItemByIdController = async (req: Request, res: Response) => {
  const result = await getOrderItemByIdService(Number(req.params.id));
  if (!result) {
    return errorResponse(res, 404, "order item not found");
  }
  return successResponse(res, 200, result);
};

// update by id
const updateOrderItemController = async (req: Request, res: Response) => {
  const result = await updateOrderItemService(Number(req.params.id), req.body);

  if (!result) {
    return errorResponse(res, 404, "Order Item not found");
  }
  return successResponse(res, 200, result);
};

// delete by id
const deleteOrderItemController = async (req: Request, res: Response) => {
  const order = await deleteOrderItemService(Number(req.params.id));
  if (!order) errorResponse(res, 404, "Order Item not found");
  return successResponse(res, 200, {
    message: "Order Item delete successfully",
  });
};

export {
  getOrderItemsController,
  getOrderItemByIdController,
  createOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
};
