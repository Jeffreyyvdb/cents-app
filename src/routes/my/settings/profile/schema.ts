import { z } from 'zod';

// Refine the avatar Upload..
// avatar: z.custom<File>(),
// .refine((f) => File && f.size < 10000, 'Max 10Kb upload size.')

export const profileFormSchema = z.object({
    fullname: z
        .string()
        .min(3, 'Name must be at least 3 characters.')
        .max(30, 'Name must not be longer than 30 characters'),
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters.')
        .max(30, 'Username must not be longer than 30 characters'),
    bio: z.string().min(4).max(160).default('I own a computer.'),
    website: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .default('https://cents.jeffreyyvdb.dev')
});
export type ProfileFormSchema = typeof profileFormSchema;