import { getAccessToken, getUserPermissions } from "../helpers/auth.js"
import { generateToken, verifyToken } from "../helpers/jwt.js"
import { SECRET_KEYS } from "../contanst.js"
const expireTimePermissionsCookie = 24
export default async (req, res, next) => {
  const userId = req.headers['x-pomerium-claim-user']
  const groups = req.headers['x-pomerium-claim-groups']
  const email = req.headers['x-pomerium-claim-email']
  if (!userId || !email) {
    return res.sendStatus(403)
  }
  let role = formatRoles(groups)
  req.user = {
    email,
  }
  const { permissions } = req.cookies
  let permissionsInfo = await verifyToken(
    permissions,
    SECRET_KEYS
  ).catch(err => {
    console.log(err)
    return null
  })
  if (!permissionsInfo || !role) {
    const accessToken = await getAccessToken().catch(err => console.log(err))
    const { role: userRole, permissions: userPermissions } =
      await getUserPermissions(
        userId,
        accessToken.access_token,
        groups,
        email
      ).catch(() => {})
    if (!userPermissions) {
      res.cookie('permissions', '', {
        domain: process.env.COOKIE_DOMAIN,
        secure: true,
        expires: new Date(),
        httpOnly: true,
      })
      return res.status(401).send({
        errorCode: 'LOGIN_FAIL'
      })
    }
    permissionsInfo = { permissions: userPermissions }
    role = role || userRole
    const permissionToken = generateToken(
      {
        permissions: userPermissions,
      },
      SECRET_KEYS,
      '24h'
    )
    res.cookie('permissions', permissionToken, {
      domain: process.env.COOKIE_DOMAIN,
      secure: true,
      expires: new Date(Date.now() + expireTimePermissionsCookie * 3600000),
      httpOnly: true,
    })
  }
  console.log(permissionsInfo)

  req.user.permissions = permissionsInfo.permissions
  req.user.role = role
  next()
}

function formatRoles(groups = '') {
  const role = groups.split(',')
  if (role.length === 1) {
    return null
  }
  return {
    id: role[0],
    name: role[1],
  }
}
