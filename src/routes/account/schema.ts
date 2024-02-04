import {z } from "zod";

export const updateAccountSchema = z.object({
    displayName  : z.string().min(3),
    username : z.string().min(3),
    website : z.string().url(),
    avatar : z.string(),
});
