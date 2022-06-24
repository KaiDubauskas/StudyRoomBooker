import { ObjectId } from "mongodb"
import express from "express"
import mongodb from "mongodb"
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
                query = { "building": { $eq: filters["building"] } }
            } if ("isOpen" in filters) {
                let openOrNot = (filters["isOpen"] === 'true')
                query.isOpen = { $eq: openOrNot }
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
        //console.log(await cursor.toArray())

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
    //     {
    //     "studyroom_id": "62a76878279469e1fd22b1f9",
    //         "name": "1",
    //             "start_time": 9,
    //                 "length": 3,
    //                     "user_id": "1"
    // }

    static async checkValidReservation(studyroom_id, start, length) {
        try {
            let cursor = await studyrooms.findOne({ _id: ObjectId(studyroom_id) })
            let beginning = (start - cursor.open_time) * 2
            let end = (cursor.end_time - cursor.open_time) * 2
            let today = new Date()
            if (start <= today.getHours())
                return false


            for (let i = beginning; i < (beginning + length * 2); i++) {
                if (cursor.avail_times[i] == false || i >= end) {
                    return false
                }
            }
            return true;
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async updateIsOpen(studyroom_id) {
        try {
            let cursor = await studyrooms.findOne({ _id: ObjectId(studyroom_id) })
            let new_avail_times = cursor.avail_times
            let today = new Date()
            //10 = today.getHours()
            let index = (today.getHours() - cursor.open_time) * 2

            if (today.getMinutes() >= 30)
                index++;

            let updateRoom

            if (new_avail_times[index] == false) {
                updateRoom = await studyrooms.updateOne(
                    { _id: ObjectId(studyroom_id) },
                    { $set: { isOpen: false } },
                )
            } else {
                updateRoom = await studyrooms.updateOne(
                    { _id: ObjectId(studyroom_id) },
                    { $set: { isOpen: true } },
                )
            }
            return updateRoom

        } catch (e) {
            console.error(`Unable to update isOpen: ${e}`)
            return { error: e }
        }
    }

    static async updateAllRooms() {
        try {
            let cursor = await studyrooms.find({})
            let today = new Date()


            cursor.forEach(e => {
                let index = (today.getHours() - e.open_time) * 2

                if (today.getMinutes() >= 30)
                    index++;
                //console.log(e._id + " " + e.open_time)
                if (e.avail_times[index] == false) {
                    studyrooms.updateOne(
                        { _id: e._id },
                        { $set: { isOpen: false } },
                    )
                }
                else {
                    studyrooms.updateOne(
                        { _id: e._id },
                        { $set: { isOpen: true } },
                    )
                }

            })
        } catch (e) {
            console.error(`Unable to update all rooms: ${e}`)
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
            this.updateIsOpen(studyroom_id)

            return updateRoom
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }
    static async
}
