import { redirect } from "@sveltejs/kit";


export const actions  = { 
    default: async ({  locals: {supabase, getSession}  }) => {
        console.log("sign out from server")
        const session = await getSession();
        if(session){
            await supabase.auth.signOut()
            throw redirect(303, "/signin")
        }
    }}