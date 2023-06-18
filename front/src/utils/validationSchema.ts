import { z } from "zod";
export const validationSchema = z.object({
  title: z.string().nonempty().max(20),
  body: z.string().nonempty().max(60),
});
