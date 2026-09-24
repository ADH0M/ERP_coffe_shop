import { Router } from "express";

import {
  createRetailProductController,
  getRetailProductsController,
  getRetailProductsByIdController,
  updateRetailProductsController,
  deleteRetailProductsController,
} from "../controller/retailProducts.controller.js";

import {
  createRetailProductsSchema,
  updateRetailProductsSchema,
  retailProductIdSchema,
} from "../schemas/retailProducts.schema.js";

import { validateBody, validateParams } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router: Router = Router();

router.post(
  "/",
  validateBody(createRetailProductsSchema),
  asyncHandler(createRetailProductController),
);

router.get("/", getRetailProductsController);

router.get(
  "/:id",
  validateParams(retailProductIdSchema),
  asyncHandler(getRetailProductsByIdController),
);

router.patch(
  "/:id",
  validateParams(retailProductIdSchema),
  validateBody(updateRetailProductsSchema),
  asyncHandler(updateRetailProductsController),
);

router.delete(
  "/:id",
  validateParams(retailProductIdSchema),
  asyncHandler(deleteRetailProductsController),
);

export default router;
