import { Router } from "express";
import {
  createBeverageController,
  deleteBerevageController,
  getBeverageByIdController,
  getBeveragesController,
  updateBeverageController,
} from "../controller/beverages.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  beveragesIdSchema,
  createBeveragesSchema,
  updateBeveragesSchema,
} from "../schemas/breverages.shema.js";
const route: Router = Router();

// get all
route.get("/", asyncHandler(getBeveragesController));

// create
route.post(
  "/",
  validateBody(createBeveragesSchema),
  asyncHandler(createBeverageController),
);

// get by id 
route.get(
  "/:id",
  validateParams(beveragesIdSchema),
  asyncHandler(getBeverageByIdController),
);

// update
route.patch(
  "/:id",
  validateParams(beveragesIdSchema),
  validateBody(updateBeveragesSchema),
  asyncHandler(updateBeverageController),
);

// delete
route.delete(
  "/:id",
  validateParams(beveragesIdSchema),
  asyncHandler(deleteBerevageController),
);



export default route;
