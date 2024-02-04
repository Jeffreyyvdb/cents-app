import { string, z } from "zod";

export const signInSchema = z.object({
    email: string().email("Please enter a valid email."),
    password: string()});
