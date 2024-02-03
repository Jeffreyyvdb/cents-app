import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  console.log("ran layout load");
  return {
    session: await getSession(),
  }
}