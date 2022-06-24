import express from "express"
import cors from "cors"
import studyrooms from "./api/studyrooms.route.js"

const app = express()


app.use(cors())
app.use(express.json())

app.use("/api/v1/studyrooms", studyrooms)
//app.use("/studyrooms", studyrooms)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
