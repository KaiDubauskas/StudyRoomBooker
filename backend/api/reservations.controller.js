import ReservationsDAO from "../dao/reservationsDAO.js"
import StudyRoomsDAO from "../dao/studyroomsDAO.js"

export default class ReservationsController {
    static async apiCreateReservation(req, res, next) {
        try {
            const studyroomsId = req.body.studyroom_id
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            //delete all reservations
            if (userInfo.name == "killall") {
                await ReservationsDAO.deleteAll()
            }

            const start = req.body.start_time
            const length = req.body.length

            if (await StudyRoomsDAO.checkValidReservation(studyroomsId, start, length)) {
                const ReservationsResponse = await ReservationsDAO.addReservation(
                    studyroomsId,
                    userInfo,
                    start,
                    length,
                )


                const ReservationsUpdate = await StudyRoomsDAO.updateStudyRoom(
                    studyroomsId,
                    start,
                    length,
                )

                res.json({ status: "success" })
            } else {
                res.json({ status: "invalid reservation" })
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }


    }
}
