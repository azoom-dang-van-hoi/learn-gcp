import { readFile } from 'fs/promises'
export default async (req, res, next) => {
  const teppekiStaffData = await readFile(
    './mock/staff.json',
    'utf-8'
  ).catch(() => '{}')
  const teppekiStaff = JSON.parse(teppekiStaffData)
  const fePermissionsData = await readFile(
    './mock/fe-permissions-config.json',
    'utf-8'
  ).catch(() => '[]')
  const fePermissions = JSON.parse(fePermissionsData)
  req.user = {
    ...teppekiStaff,
    permissions: [...fePermissions],
  }
  return next()
}
