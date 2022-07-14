export default (req, res) => {
  console.log(req.user)
  return res.send(req.user)
}
