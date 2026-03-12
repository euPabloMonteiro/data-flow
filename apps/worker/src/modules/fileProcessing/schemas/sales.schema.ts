import { z } from "zod";

export const salesSchema = z.object({
  date: z.string(),
  product: z.string(),
  category: z.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  customer_country: z.string(),
});

export type SalesRowType = z.infer<typeof salesSchema>;
