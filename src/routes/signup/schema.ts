import { string, z } from "zod";

export const formSchema = z.object({
    email: string().email(),
    password: string(),
    confirm: string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
});

export type FormSchema = typeof formSchema;