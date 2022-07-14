export default async (req, res, next) => {
  const permissions = req.user.permissions || []
  const currentPath = (req.originalUrl || "").split("?")[0]
  const method = req.method
  const hasPermission = permissions.some((permission) => {
    console.log(
      "/" + permission.replace(/:/g, "/"),
      formatCurrentPath(currentPath, method)
    )
    return (
      "/" + permission.replace(/:/g, "/") ===
      "/api" + formatCurrentPath(currentPath, method)
    )
  })
  if (!hasPermission) {
    return res.sendStatus(403)
  }
  next()
}

function formatCurrentPath(currentPath, method) {
  return currentPath
    .split("/")
    .map((path) => {
      if (!isNaN(+path) && path !== "") {
        return "_id"
      }
      return path
    })
    .join("/") +
    "/" +
    method.toLowerCase()
}
