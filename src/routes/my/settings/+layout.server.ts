import { allNav } from '$lib/types/nav.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
    const session = await locals.getSession();

    // If user is not logged in
    if(!session){
        throw redirect(303, allNav.SignIn.href)
    }
}