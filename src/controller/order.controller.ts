import type { Request, Response, NextFunction } from "express";
import {
  createOrderService,
  deleteOrderService,
  getOrderByIdService,
  getOrderService,
  updateOrderService,
} from "../services/order.services.js";
import { errorResponse, successResponse } from "../utils/responses.js";

// get all
const getOrdersController = async (_req: Request, res: Response) => {
  const result = await getOrderService();
  return successResponse(res, 200, result);
};

// create
const createOrderController = async (req: Request, res: Response) => {
  const result = await createOrderService(req.body);
  if (!result) errorResponse(res, 500, "Can not create order at this time.");
  return successResponse(res, 201, result);
};

// get by id
const getOrderByIdController = async (req: Request, res: Response) => {
  const result = await getOrderByIdService(Number(req.params.id));
  if (!result) {
    return errorResponse(res, 404, "order not found");
  }
  return successResponse(res,200,result);
};

// update by id
const updateOrderController = async (req: Request, res: Response) => {
  const result = await updateOrderService(
    Number(req.params.id),
    req.body,
  );

  if(!result){
    return errorResponse(res , 404 ,"order not found")
  }
  return successResponse(res , 200 , result);
};

// delete by id
const deleteOrderController = async (
  req: Request,
  res: Response,
) => {
    const order = await deleteOrderService(Number(req.params.id));
    if(!order)errorResponse(res,404,'Order not found')
  return successResponse(res ,200 , {message :'Order delete successfully'});
};

export {
  getOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};
