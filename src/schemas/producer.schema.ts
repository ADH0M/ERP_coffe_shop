import { z } from "zod";

export const producerIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});


export const createProducerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  rating: z.number().min(0).max(5).optional(),
  phone: z
    .string()
    .regex(/^(?:\+20|0)1[0125]\d{8}$/)
    .optional(),
});

export const updateProducerSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    rating: z.number().min(0).max(5).optional(),
    phone: z
      .string()
      .regex(/^(?:\+20|0)1[0125]\d{8}$/)
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type CreateProducerInput = z.infer<typeof createProducerSchema>;
export type UpdateProducerInput = z.infer<typeof updateProducerSchema>;
