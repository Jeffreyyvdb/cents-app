import { redirect } from '@sveltejs/kit'

export const load = async ({ locals}) => {
    const session = await locals.getSession()
    // If users is logged in, always redirect to profile.
    if(!session){
        throw redirect(303, '/login')
    } else{
       throw redirect(303, '/my/settings/profile') 
    }
}