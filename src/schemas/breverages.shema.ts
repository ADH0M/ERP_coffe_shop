import z from "zod";

const beveragesIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const createBeveragesSchema = z.object({
  name: z.string().min(2).max(100),
  drink_type: z.string().min(2).max(50),
  roast_level: z.string().min(2).max(20).optional(),
  is_mahuj: z.boolean().default(false),
  price: z.number().min(1).max(100000),
  description: z.string().min(3).max(200).optional(),
});

const updateBeveragesSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    drink_type: z.string().min(2).max(50).optional(),
    roast_level: z.string().min(2).max(20).optional(),
    is_mahuj: z.boolean().default(false).optional(),
    price: z.number().min(1).max(100000).optional(),
    description: z.string().min(3).max(200).optional(),
  })
  .refine(
    (check) => {
      return Object.keys(check).length > 0;
    },
    { message: "At least one field is required" },
  );

type CreateBeveragesSchema = z.infer<typeof createBeveragesSchema>;
type UpdateBeveragesSchema = z.infer<typeof updateBeveragesSchema>;

export type { CreateBeveragesSchema, UpdateBeveragesSchema };
export { beveragesIdSchema, createBeveragesSchema, updateBeveragesSchema };
