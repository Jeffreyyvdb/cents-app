import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession(); 
  
  const {data: profile} = await supabase
  .from('profiles')
  .select('username, full_name, website, avatar_url',)
  .eq('id', session?.user.id)
  .single();

  return { session, profile };
}