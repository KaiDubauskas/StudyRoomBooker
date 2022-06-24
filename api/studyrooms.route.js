import express from "express"
import StudyRoomsCtrl from "./studyrooms.controller.js"
import ReservationsCtrl from "./reservations.controller.js"



const router = express.Router()
router.route("/").get(StudyRoomsCtrl.apiGetStudyRooms)


router.route("/openrooms").post(StudyRoomsCtrl.apiUpdateIsOpen)

router
    .route("/reserve")
    .post(ReservationsCtrl.apiCreateReservation)




export default router
