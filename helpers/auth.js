import got from "got"

var options = {
  method: "POST",
  headers: { "content-type": "application/json" },
  json: {
    grant_type: "client_credentials",
    client_id: "XD5a5YaFySFdlhS3suQilLKcsO42gLsN",
    client_secret:
      "9a7X-omfevxGDr0TeBgZ9npYR3LlO9g_EoE0IQaI_ZaM6g3qS-pJ8gjg5YJ98Hee",
    audience: "https://hoi-pomerium.jp.auth0.com/api/v2/",
  },
}

const adminRole = {
  id: "rol_jXBKzJvKCxmeGlUj",
  name: "admin",
}

export const getAccessToken = () => {
  return got("https://hoi-pomerium.jp.auth0.com/oauth/token", options).json()
}

export const assignRolesForUser = (userId, accessToken, roles) => {
  return got(`https://hoi-pomerium.jp.auth0.com/api/v2/users/${userId}/roles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: {
      roles,
    },
  }).json()
}

export const deleteUser = (userId, accessToken) => {
  return got(`https://hoi-pomerium.jp.auth0.com/api/v2/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).json()
}

export const getUserPermissions = async (
  userId,
  accessToken,
  groups,
  email
) => {
  let role
  if (!groups) {
    if (email.endsWith("@azoom.jp")) {
      await assignRolesForUser(userId, accessToken, [adminRole.id])
      role = adminRole
    } else {
      return {}
    }
  }
  const permissionsData =
    (await got(
      `https://hoi-pomerium.jp.auth0.com/api/v2/users/${userId}/permissions`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).json()) || []
  return {
    role,
    permissions: permissionsData.map(
      (permission) => permission["permission_name"]
    ),
  }
}
