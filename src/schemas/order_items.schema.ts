import { z } from "zod";

const orderItemIdSchema = z.object({
  id: z.coerce.number().positive(),
});

const createOrderItemSchema = z.object({
  order_id: z.coerce.number().positive(),
  retail_product_id: z.coerce.number().positive().optional(),
  beverage_id: z.coerce.number().positive().optional(),
  quantity: z.number().positive(),
  unit_price: z.number().positive(),
});

const updateOrderItemSchema = z
  .object({
    order_id: z.coerce.number().positive().optional(),
    retail_product_id: z.coerce.number().positive().optional(),
    beverage_id: z.coerce.number().positive().optional(),
    quantity: z.number().positive().optional(),
    unit_price: z.number().positive().optional(),
  })
  .refine((param) => Object.keys(param).length > 0, {
    message: "At least one field is required",
  });

type CreateOrderItemSchema = z.infer<typeof createOrderItemSchema>;
type UpdateOrderItemSchema = z.infer<typeof updateOrderItemSchema>;

export { orderItemIdSchema, createOrderItemSchema, updateOrderItemSchema };
export type { CreateOrderItemSchema, UpdateOrderItemSchema };
