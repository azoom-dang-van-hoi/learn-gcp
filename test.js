import { getAccessToken, getUserPermissions } from "./helpers/auth.js"

async function main() {
  const token = (await getAccessToken()).access_token
  const permissions = await getUserPermissions(
    "auth0|62ccee1fa816f3ec21c199b9",
    token
  ).catch((err) => console.log(err))
  console.log(permissions)
}
main()
