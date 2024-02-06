import { z } from 'zod';

// Refine the avatar Upload..
// avatar: z.custom<File>(),
// .refine((f) => File && f.size < 10000, 'Max 10Kb upload size.')

export const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, 'Username must be at least 2 characters.')
        .max(30, 'Username must not be longer than 30 characters'),
    email: z.string({ required_error: 'Please select an email to display' }).email(),
    bio: z.string().min(4).max(160).default('I own a computer.'),
    website: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .default('https://cents.jeffreyyvdb.dev')
});
export type ProfileFormSchema = typeof profileFormSchema;