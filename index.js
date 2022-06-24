import app from "./server.js"
import * as ReactDOM from 'react-dom'
import mongodb from "mongodb"
import dotenv from "dotenv"
import StudyRoomsDAO from "./dao/studyroomsDAO.js"
import ReservationsDAO from "./dao/reservationsDAO.js"


dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000


MongoClient.connect(
    process.env.STUDYROOMS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await StudyRoomsDAO.injectDB(client)
        await ReservationsDAO.injectDB(client)

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

