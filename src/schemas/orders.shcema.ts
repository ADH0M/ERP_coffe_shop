import { z } from "zod";

const orderIdSchema = z.object({
  id:z.coerce.number().positive(),
});

const createOrderSchema = z.object({
  customer_name: z.string().min(2).max(100).optional(),
  address: z.string().min(6).max(200),
  total_price: z.number().positive(),
  status: z
    .enum(["pending", "preparing", "completed", "cancelled"])
    .default("completed"),
});

const updateOrderSchema = z
  .object({
    customer_name: z.string().min(2).max(100).optional(),
    address: z.string().min(6).max(200).optional(),
    total_price: z.number().positive().optional(),
    status: z
      .enum(["pending", "preparing", "completed", "cancelled"])
      .default("completed"),
  })
  .refine((param) => Object.keys(param).length > 0, {
    message: "At least one field is required",
  });

type CreateOrderSchema = z.infer<typeof createOrderSchema>;
type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;

export { orderIdSchema, createOrderSchema, updateOrderSchema };
export type { CreateOrderSchema, UpdateOrderSchema };
