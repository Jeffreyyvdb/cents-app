import {superValidate} from "sveltekit-superforms/server";
import type {PageServerLoad} from "./$types";
import {accountFormSchema} from "./account-form.svelte";
import {fail, type Actions} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import { allNav } from "$lib/types/nav";

export const load: PageServerLoad = async () => {

    // Redirect for now until this page is developed
    redirect(307, allNav.Settings.href)
    return {
        form: await superValidate(accountFormSchema),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, accountFormSchema);
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        return {
            form,
        };
    },
};