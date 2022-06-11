import { ObjectId } from "mongodb"
import { Rooms } from "../rooms.js"
//const Rooms = require('../rooms.js')

let studyrooms

export default class StudyRoomsDAO {
    static async injectDB(conn) {
        if (studyrooms) {
            return
        }
        try {
            studyrooms = await conn.db(process.env.STUDYROOMS_NS).collection("rooms")
            //await studyrooms.insertMany(Rooms, { upsert: true }) //second param: ordered: true??
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`
            )
        }
    }

    static async getStudyRooms({
        filters = null,
        page = 0,
        studyroomsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("building" in filters) {
                query = { $text: { $search: filters["building"] } }
            } else if ("size" in filters) {
                query = { "size": { $eq: filters["size"] } }
            } else if ("avail_times" in filters) {
                query = { "avail_times": { $eq: filters["avail_times"] } }
            }
        }

        let cursor

        try {
            cursor = await studyrooms
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { studyroomsList: [], totalStudyRooms: 0 }
        }

        const displayCursor = cursor.limit(studyroomsPerPage).skip(studyroomsPerPage * page)

        try {
            const studyroomsList = await displayCursor.toArray()
            const totalStudyRooms = await studyrooms.countDocuments(query)

            return { studyroomsList, totalStudyRooms }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { studyroomsList: [], totalStudyRooms: 0 }
        }
    }

    static async checkValidReservation(studyroom_id, start, length) {
        try {
            let cursor = await studyrooms.findOne({ _id: ObjectId(studyroom_id) })
            let beginning = (start - cursor.open_time) * 2
            let end = (cursor.end_time - cursor.open_time) * 2
            for (let i = beginning; i < (beginning + length * 2); i++) {
                if (cursor.avail_times[i] == false || i >= end) {
                    return false;
                }
            }
            return true;
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async updateStudyRoom(studyroom_id, start, length) {
        try {
            let cursor = await studyrooms.findOne({ _id: ObjectId(studyroom_id) })
            let new_avail_times = cursor.avail_times
            let beginning = (start - cursor.open_time) * 2

            for (let i = beginning; i < (beginning + length * 2); i++) {
                new_avail_times[i] = false;
            }


            const updateRoom = await studyrooms.updateMany(
                { _id: ObjectId(studyroom_id) },
                { $set: { avail_times: new_avail_times } },
            )

            return updateRoom
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }
}
