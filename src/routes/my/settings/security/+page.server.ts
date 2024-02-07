// Redirect for now until this page is developed
import {redirect} from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";


export const load: PageServerLoad = async () => { 
    // Redirect to profile until this page is developed
    redirect(307, "/my/settings/profile")
}

