import type { Request, Response } from "express";

import {
  createRetailProduct,
  deleteRetailProduct,
  getRetailProductById,
  getRetailProducts,
  updateRetailProduct,
} from "../services/retailProducts.services.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const createRetailProductController = async (
  req: Request,
  res: Response,
) => {
  const retailProduct = await createRetailProduct(req.body);
  return successResponse(res, 201, retailProduct);
};

export const getRetailProductsController = async (
  _req: Request,
  res: Response,
) => {
  const retailProducts = await getRetailProducts();

  return successResponse(res, 200, retailProducts);
};

export const getRetailProductsByIdController = async (
  req: Request,
  res: Response,
) => {
  const retailProduct = await getRetailProductById(Number(req.params.id));

  if (!retailProduct) {
    return errorResponse(res, 404, "retail products not found");
  }

  return successResponse(res , 200 , retailProduct)
};

export const updateRetailProductsController = async (
  req: Request,
  res: Response,
) => {
  const retailProduct = await updateRetailProduct(
    Number(req.params.id),
    req.body,
  );

  if (!retailProduct) {
    return errorResponse(res, 404, "Retail Product Not Found");
  }

  return successResponse(res,200, retailProduct)
};

export const deleteRetailProductsController = async (
  req: Request,
  res: Response,
) => {
  const retailProduct = await deleteRetailProduct(Number(req.params.id));

  if (!retailProduct) {
    return errorResponse(res, 404, "Retail Products not found");
  }

 return successResponse(res , 200 ,{ message: "Retail product deleted successfully"})
};
