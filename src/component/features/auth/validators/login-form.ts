import { z } from "zod";

export const LoginSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
