import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().optional(),
  sex: z.string(),
  bio: z.string().optional(),
  photoProfile: z.any(),
  coverImage: z.any(),
});
