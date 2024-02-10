import { allNav } from "$lib/types/nav.js";
import { redirect } from "@sveltejs/kit";


export const actions  = { 
    default: async ({  locals: {supabase, getSession}  }) => {
        const session = await getSession();
        if(session){
            await supabase.auth.signOut()
            throw redirect(303, allNav.SignIn.href)
        }
    }}