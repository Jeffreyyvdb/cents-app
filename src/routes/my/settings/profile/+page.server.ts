import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { profileFormSchema } from "./schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	
	const form = await superValidate(profileFormSchema)
	const session = await event.locals.getSession()
  
	if(!session){
	  redirect(303, "/")
	}
	
	const {data: profile} = await event.locals.supabase
	.from('profiles')
	.select('username, full_name, website, avatar_url',)
	.eq('id', session.user.id)
	.single()
	
	// form.data.avatar = profile?.avatar_url
	form.data.fullname = profile?.full_name
	form.data.username = profile?.username
	form.data.website = profile?.website

	return {
form	};
};

export const actions: Actions = {
	default: async (event) => {
		
		const formData = await event.request.formData();
		const form = await superValidate(formData, profileFormSchema);
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		console.log("Submitted valid form: " ,form);
		console.log("Formdata: ",formData)


		
		const session = await event.locals.getSession()
  

		const { error } = await event.locals.supabase.from('profiles').upsert({
		  id: session?.user.id,
		  full_name: form.data.fullname,
		  username: form.data.username,
		  website: form.data.website,
		  updated_at: new Date(),
		})
  
		if (error) {
		  return fail(500, {form})
		}

		// https://superforms.rocks/faq#how-to-handle-file-uploads
		const file = formData.get('avatar');
		if (file instanceof File) {
		  // Do something with the file.
		}

		return {
			form,
		};
	},
};