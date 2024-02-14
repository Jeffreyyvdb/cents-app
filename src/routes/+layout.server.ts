import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data: profile } = await locals.supabase
		.from('profiles')
		.select('username, full_name, website, avatar_url')
		.eq('id', session?.user.id as string)
		.single();

	return { session, profile };
};
