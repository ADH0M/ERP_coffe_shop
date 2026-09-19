import { Router } from "express";

import {
  createProducerController,
  getProducersController,
  getProducerByIdController,
  updateProducerController,
  deleteProducerController,
} from "../controller/producers.controller.js";

import {
  createProducerSchema,
  updateProducerSchema,
  producerIdSchema,
} from "../schemas/producer.schema.js";

import { validateBody, validateParams } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router: Router = Router();

router.post(
  "/",
  validateBody(createProducerSchema),
  asyncHandler(createProducerController),
);

router.get("/", getProducersController);

router.get("/:id", validateParams(producerIdSchema), asyncHandler(getProducerByIdController));

router.patch(
  "/:id",
  validateParams(producerIdSchema),
  validateBody(updateProducerSchema),
  asyncHandler(updateProducerController),
);

router.delete(
  "/:id",
  validateParams(producerIdSchema),
  asyncHandler(deleteProducerController),
);

export default router;
