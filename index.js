import express from "express"
import promiseRouter from "express-promise-router"
import nnnRouter from "nnn-router"
import cors from "cors"
import statuses from "statuses"
import cookie from 'cookie-parser'

// Customize express response
express.response.sendStatus = function (statusCode) {
  const body = { message: statuses(statusCode) || String(statusCode) }
  this.statusCode = statusCode
  this.type("json")
  this.send(body)
}

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  /* Add express.json and express.urlencoded to parse bodies
    https://github.com/expressjs/express/releases/tag/4.16.0 */
  express.urlencoded({ extended: true }),
  express.json(),
  express.text(),
  cookie()
)

app.use(
  nnnRouter({ routeDir: "/routes", baseRouter: promiseRouter() }),
  (error, req, res, next) => {
    console.error(error)
    return res.sendStatus(500)
  }
)

const port = process.env.PORT || 80
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
