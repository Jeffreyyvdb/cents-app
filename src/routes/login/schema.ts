import { string, z } from "zod";

export const formSchema = z.object({
    email: string().email(),
    password: string()});

export type FormSchema = typeof formSchema;