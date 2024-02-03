import type { PageServerLoad, Actions } from "./$types";
import { fail , redirect} from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { AuthApiError } from "@supabase/supabase-js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(formSchema),
  };
};

export const actions: Actions = {
  default: async({ request, locals}) => {
      const body = Object.fromEntries(await request.formData())

      const { data, error: err} = await locals.supabase.auth.signInWithPassword({
          email: body.email as string,
          password: body.password as string
      })

      if(err){
          if ( err instanceof AuthApiError && err.status === 400){
              return fail(400, { error: 'Invalid credentials'})
          }
          return fail(500, {
              error: 'Server error, Please try again later.'
          })
      }

      console.log( "succes logging in")

      throw redirect(303, "/")
  }
}