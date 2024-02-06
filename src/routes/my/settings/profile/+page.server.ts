import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { profileFormSchema } from "./schema";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(profileFormSchema),
	};
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