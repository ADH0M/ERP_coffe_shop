import type { Request, Response } from "express";

import {
  createProducer,
  getProducers,
  getProducerById,
  updateProducer,
  deleteProducer,
} from "../services/producer-service.js";

export const createProducerController = async (
  req: Request,
  res: Response,
) => {
  const producer = await createProducer(req.body);

  res.status(201).json({
    success: true,
    data: producer,
  });
};

export const getProducersController = async (
  _req: Request,
  res: Response,
) => {
  const producers = await getProducers();

  res.status(200).json({
    success: true,
    data: producers,
  });
};

export const getProducerByIdController = async (
  req: Request,
  res: Response,
) => {
  const producer = await getProducerById(
    Number(req.params.id),
  );

  if (!producer) {
    res.status(404).json({
      success: false,
      message: "Producer not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: producer,
  });
};

export const updateProducerController = async (
  req: Request,
  res: Response,
) => {
  const producer = await updateProducer(
    Number(req.params.id),
    req.body,
  );

  if (!producer) {
    res.status(404).json({
      success: false,
      message: "Producer not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: producer,
  });
};

export const deleteProducerController = async (
  req: Request,
  res: Response,
) => {
  const producer = await deleteProducer(
    Number(req.params.id),
  );

  if (!producer) {
    res.status(404).json({
      success: false,
      message: "Producer not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Producer deleted successfully",
  });
};
