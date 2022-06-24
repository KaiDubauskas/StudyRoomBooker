import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reservations

export default class ReservationsDAO {
    static async injectDB(conn) {
        if (reservations) {
            return
        }
        try {
            reservations = await conn.db(process.env.STUDYROOMS_NS).collection("reservations")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReservation(studyroomId, user, start, length) {
        try {
            const reservationDoc = {
                user_id: user._id,
                name: user.name,
                start_time: start,
                length: length,
                studyroom_id: ObjectId(studyroomId),
            }

            return await reservations.insertOne(reservationDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async deleteAll() {
        try {
            reservations.deleteMany({})
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    // static async updateReview(reviewId, userId, text, date) {
    //     try {
    //         const updateResponse = await reviews.updateOne(
    //             { user_id: userId, _id: ObjectId(reviewId) },
    //             { $set: { text: text, date: date } },
    //         )

    //         return updateResponse
    //     } catch (e) {
    //         console.error(`Unable to update review: ${e}`)
    //         return { error: e }
    //     }
    // }

    // static async deleteReview(reviewId, userId) {

    //     try {
    //         const deleteResponse = await reviews.deleteOne({
    //             _id: ObjectId(reviewId),
    //             user_id: userId,
    //         })

    //         return deleteResponse
    //     } catch (e) {
    //         console.error(`Unable to delete review: ${e}`)
    //         return { error: e }
    //     }
    // }

}
