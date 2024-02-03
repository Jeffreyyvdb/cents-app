import type { PageServerLoad, Actions } from "./$types";
import { fail , redirect} from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "./schema";
import { AuthApiError } from "@supabase/supabase-js";

export const load: PageServerLoad = async (event) => {
  const form = await superValidate(event, loginSchema)
  return {
    form
  };
};

export const actions: Actions = {
  default: async({ request, locals: {supabase}}) => {
      const form = await superValidate(request, loginSchema)

      if(!form.valid){
        return fail(400, {form});
      }

      const email = form.data.email;
      const password = form.data.password;

      const { error } = await supabase.auth.signInWithPassword({email, password});

      if(error instanceof AuthApiError && error.status === 400){
        return fail(400, { message: error.message, succes: false, email, form})
      }

      if(error){
        return fail(500, { message: error.message, succes: false, email, form})
      }

      throw redirect(303, "/")
  }
}