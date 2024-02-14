import { z } from 'zod';


export const walletFormSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters.')
		.max(30, 'Name must not be longer than 30 characters')
});
export type WalletFormSchema = typeof walletFormSchema;
