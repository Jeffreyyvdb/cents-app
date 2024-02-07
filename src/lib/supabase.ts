import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';

export const supabaseClient = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

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
