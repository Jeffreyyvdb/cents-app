import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { profileFormSchema } from './schema';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(profileFormSchema);
	const session = await event.locals.getSession();

	if (!session) {
		redirect(303, '/');
	}

	const { data: profile } = await event.locals.supabase
		.from('profiles')
		.select('username, full_name, website, avatar_url')
		.eq('id', session.user.id)
		.single();

	form.data.fullname = profile?.full_name;
	form.data.username = profile?.username;
	form.data.website = profile?.website;
	const url = profile?.avatar_url;

	return {
		form,
		url,
		userId: session.user.id
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, profileFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const session = await event.locals.getSession();

		const avatarUrl = formData.get('avatarUrl');

		const { error } = await event.locals.supabase.from('profiles').upsert({
			id: session?.user.id,
			avatar_url: avatarUrl,
			full_name: form.data.fullname,
			username: form.data.username,
			website: form.data.website,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, { form });
		}

		return {
			form
		};
	}
};
