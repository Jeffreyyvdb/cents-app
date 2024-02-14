import { superValidate } from 'sveltekit-superforms/server';
import { walletFormSchema } from './walletSchema';
import type { PageServerLoad } from './$types';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { allNav } from '$lib/types/nav';

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(walletFormSchema);

	const session = await event.locals.getSession();

	if (!session) {
		redirect(303, allNav.Dashboard.href);
	}

	return { form };
};

export const actions: Actions = {
	create: async (event) => {
		const session = await event.locals.getSession();

		const formData = await event.request.formData();
		const form = await superValidate(formData, walletFormSchema);

		if (!session) {
			console.log('No Session ');
			return fail(400, { form });
		}

		if (!form.valid) {
			console.log('Invalid form');
			return fail(400, { form });
		}

		const { error } = await event.locals.supabase.from('wallets').insert({
			name: form.data.name,
			profile_id: session.user.id
		});

		if (error) {
			console.error(error.message);
		}

		return { form };
	}
};
