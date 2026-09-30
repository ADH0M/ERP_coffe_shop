import { z } from "zod";
import { createOrderItemSchema } from "./order_items.schema.js";

const orderIdSchema = z.object({
  id: z.coerce.number().positive(),
});

const createOrderSchema = z.object({
  customer_name: z.string().min(2).max(100).optional(),
  address: z.string().min(6).max(200),
  total_price: z.number().positive(),
  status: z
    .enum(["pending", "preparing", "completed", "cancelled"])
    .default("completed"),
  items: z.array(
    z.object({
      beverage_id: z.coerce.number().positive().optional(),
      quantity: z.number().positive(),
      retail_product_id: z.coerce.number().positive().optional(),
    }),
  ),
});

const updateOrderSchema = z
  .object({
    customer_name: z.string().min(2).max(100).optional(),
    address: z.string().min(6).max(200).optional(),
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
