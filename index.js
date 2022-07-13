import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const port = 80

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get("/", (req, res) => {
  console.log(req.headers, req.cookies)
  res.cookie('test', 'demo', {
    domain: '.hoi-demo-pomerium-trkregf5uq-an.a.run.app'
  })
  res.sendStatus(200)
})

app.get("/api", (req, res) => {
  console.log(req.headers, req.cookies)
  res.cookie('test', 'demo', {
    domain: '.hoi-demo-pomerium-trkregf5uq-an.a.run.app'
  })
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("App is running")
})
