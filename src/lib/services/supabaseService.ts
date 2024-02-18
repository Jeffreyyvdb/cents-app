import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../types/database.types';

export const supabaseClient = createBrowserClient<Database>(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY
);

export const downloadImageFromSb = async (path: string): Promise<string> => {
	try {
		const { data, error } = await supabaseClient.storage.from('avatars').download(path);

		if (error) {
			throw error;
		}

		return URL.createObjectURL(data) as string;
	} catch (error) {
		console.error('Error downloading avatar', error);
		throw error;
	}
};

export const uploadImageToSb = async (files: FileList, userId: string): Promise<string> => {
	if (!files || files.length === 0) {
		throw new Error('You must select an image to upload');
	}

	// Generate name with userId and file extension
	const fileExt = files[0].name.split('.').pop();
	const filePath = `avatars/${userId}/${Math.random()}.${fileExt}`;

	const { error } = await supabaseClient.storage
		.from('avatars')
		.upload(filePath, files[0], { upsert: true });

	if (error) {
		throw error;
	}

	return filePath;
};

export const getHistoricalPrices = async (currency: string, start: Date, end: Date) => {
	const { data, error } = await supabaseClient
		.from('historical_prices')
		.select('date, open, high, low, close, adj_close, volume, currency')
		.eq('currency', currency)
		.gte('date', start.toISOString())
		.lte('date', end.toISOString());

	if (error) {
		console.error(error.message);
	}

	console.log(`getHistoricalPrices returned: ${data?.length} rows.`);
	return data;
};
