import StudyRoomsDAO from "../dao/studyroomsDAO.js"

export default class StudyRoomsController {
    static async apiGetStudyRooms(req, res, next) {
        const studyroomsPerPage = req.query.studyroomsPerPage ? parseInt(req.query.studyroomsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.building) {
            filters.building = req.query.building
        } else if (req.query.size) {
            filters.size = req.query.size
        } else if (req.query.avail_times) {
            filters.avail_times = req.query.avail_times
        }

        const { studyroomsList, totalStudyRooms } = await StudyRoomsDAO.getStudyRooms({
            filters,
            page,
            studyroomsPerPage,
        })

        let response = {
            studyRooms: studyroomsList,
            page: page,
            filters: filters,
            entries_per_page: studyroomsPerPage,
            total_results: totalStudyRooms,
        }
        res.json(response)
    }
}
