const users = [
  { email: "test@gmail.com", appType: 1 },
  { email: "dang.van.hoi@azoom.jp" },
]
export default async (req, res, next) => {
  const user = req.user
  const { email } = user
  const userData = users.find((user) => user.email === email)
  console.log(user, userData, 111)
  if (!userData) {
    return res.sendStatus(403)
  }
  req.user = { ...userData, ...user }
  next()
}
