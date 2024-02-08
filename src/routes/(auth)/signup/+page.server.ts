import type { PageServerLoad } from "./$types";
import { fail, redirect} from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { signUpSchema } from "./schema";

export const load: PageServerLoad = async (event) => {
    const form = await superValidate(event, signUpSchema);
    
    return { form };
};

export const actions ={ 
    signup: async ({ request, url, locals  }) => {
        const form = await superValidate(request, signUpSchema);

        if(!form.valid){
            return fail(400, { form });
        }

        const email = form.data.email
        const password = form.data.password

        // Register the account
        const { error, data } = await locals.supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${url.origin}/auth/callback`}
        });

        if(error){
            return fail(500, { message: error.message, succes: false, email, form})
        }

        redirect(303 , "/signin");
    }
}
