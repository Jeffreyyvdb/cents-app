import { allNav, allNavItems } from '$lib/types/nav.js'
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals }) => {
    const code = url.searchParams.get('code')

    if (code) {
      await locals.supabase.auth.exchangeCodeForSession(code)
    }

    throw redirect(303, allNav.Dashboard.href)
  }
