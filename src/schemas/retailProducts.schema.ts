import { z } from "zod";

export const retailProductIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createRetailProductsSchema = z.object({
  name: z.string().trim().min(1).max(100),
  category: z.string().trim().min(1).max(50), 
  price_per_kilo: z.number().min(0).max(100000), 
  stock_kg: z.number().min(0).max(100000), 
  producer_id: z.number().int().positive().nullable().optional(), 
});

export const updateRetailProductsSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    category: z.string().trim().min(1).max(50).optional(),
    price_per_kilo: z.number().min(0).max(100000).optional(),
    stock_kg: z.number().min(0).max(100000).optional(),
    producer_id: z.number().int().positive().nullable().optional(), 
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type CreateRetailProductsInput = z.infer<typeof createRetailProductsSchema>;
export type UpdateRetailProductsInput = z.infer<typeof updateRetailProductsSchema>;