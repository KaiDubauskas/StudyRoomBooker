import express from "express"
import StudyRoomsCtrl from "./studyrooms.controller.js"
import ReservationsCtrl from "./reservations.controller.js"


const router = express.Router()
router.route("/").get(StudyRoomsCtrl.apiGetStudyRooms)

//router.route("/rooms").get(StudyRoomsCtrl.apiGetStudyRooms)

router
    .route("/reserve")
    .post(ReservationsCtrl.apiCreateReservation)


export default router
