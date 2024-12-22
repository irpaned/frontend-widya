import { z } from "zod";

const LoginSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const ResetPasswordSchemaZod = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

const RegisterSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address!" }),

  password: z.string().min(6),

  fullName: z.string().min(3),

  sex: z.string(),
});

const ResetFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email!" }),
});

export {
  LoginSchemaZod,
  ResetPasswordSchemaZod,
  RegisterSchema,
  ResetFormSchema,
};
