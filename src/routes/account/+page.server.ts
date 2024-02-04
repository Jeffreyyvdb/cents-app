import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from "./$types";
import { updateAccountSchema } from './schema.js';


export const load : PageServerLoad = async ({  locals: {supabase,getSession}}) => {
  const form = await superValidate(updateAccountSchema)
  
  const session = await getSession()
  
  if(!session){
    redirect(303, "/")
  }
  
  const {data: profile} = await supabase
  .from('profiles')
  .select('username, full_name, website, avatar_url',)
  .eq('id', session.user.id)
  .single()
  
  form.data.avatar = profile?.avatar_url
  form.data.displayName = profile?.full_name
  form.data.username = profile?.username
  form.data.website = profile?.website
  
   return {session, profile, form}
}


export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
      const form = await superValidate(request, updateAccountSchema);

      if(!form.valid){
        return fail(400, { form})
      }
  
      const session = await getSession()
  

      const { error } = await supabase.from('profiles').upsert({
        id: session?.user.id,
        full_name: form.data.displayName,
        username: form.data.username,
        website: form.data.website,
        avatar_url: form.data.avatar,
        updated_at: new Date(),
      })

      if (error) {
        return fail(500, {form})
      }
  
      return {form}
    }
  }