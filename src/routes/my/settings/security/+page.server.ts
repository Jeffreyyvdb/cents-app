// Redirect for now until this page is developed
import {redirect} from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { allNav } from "$lib/types/nav";


export const load: PageServerLoad = async () => { 
    // Redirect to profile until this page is developed
    redirect(307, allNav.Settings.href)
}

