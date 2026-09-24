import type { Request, Response, NextFunction } from "express";
import {
  createBeverageService,
  deleteBeverageService,
  getBeverageByIdService,
  getBeveragesService,
  updateBeverageService,
} from "../services/beverages.services.js";
import { errorResponse, successResponse } from "../utils/responses.js";

// get all
const getBeveragesController = async (_req: Request, res: Response) => {
  const beverages = await getBeveragesService();
  return successResponse(res, 200, beverages);
};

// create
const createBeverageController = async (req: Request, res: Response) => {
  const beverages = await createBeverageService(req.body);
  if (!beverages) errorResponse(res, 500, "Can not create beverages at this time.");
  return successResponse(res, 201, beverages);
};

// get by id
const getBeverageByIdController = async (req: Request, res: Response) => {
  const beverages = await getBeverageByIdService(Number(req.params.id));
  if (!beverages) {
    return errorResponse(res, 404, "beverage not found");
  }
  return successResponse(res,200,beverages);
};

// update by id
const updateBeverageController = async (req: Request, res: Response) => {
  const beverage = await updateBeverageService(
    Number(req.params.id),
    req.body,
  );

  if(!beverage){
    return errorResponse(res , 404 ,"beverage not found")
  }
  return successResponse(res , 200 , beverage);
};

// delete by id
const deleteBerevageController = async (
  req: Request,
  res: Response,
) => {
    const beverage = await deleteBeverageService(Number(req.params.id));
    if(!beverage)errorResponse(res,404,'Beverage not found')
  return successResponse(res ,200 , {message :'beverage delete successfully'});
};

export {
  getBeveragesController,
  getBeverageByIdController,
  createBeverageController,
  updateBeverageController,
  deleteBerevageController,
};
