import express from "express"
import cors from "cors"

const app = express()
const port = 80

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("App is running")
})
