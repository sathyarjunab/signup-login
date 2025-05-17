import { z } from "zod";
import { TypeOfUser } from "../../infrastructure/data-base/User.ts";

const userType = Object.values(TypeOfUser) as [TypeOfUser, ...TypeOfUser[]];

export const user = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  type: z.enum(userType),
});

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});
