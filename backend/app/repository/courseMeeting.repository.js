const db = require("../../core/database");
const { v4: uuidv4 } = require("uuid");

const CourseMeetingRepository = {
    async getAllMeeting(id) {
        var all = [];
        let [meeting] = await db.query("SELECT * FROM course_meeting WHERE id_course = ?", [
            id,
        ]);
        all = all.concat(meeting);
        return all;
    },
    async addCourseMeeting(meeting) {
        let addMeeting = await db.query(
            "INSERT INTO course_meeting (id_course, name) VALUES (?, ?)",
            [
                meeting.id_course,
                meeting.name,
            ]
        );
        return meeting;
    },

    async getMeetingById(id) {
        let [meeting] = await db.query("SELECT * FROM course_meeting WHERE id = ?", [
            id,
        ]);
        return meeting[0];
    },

    async deleteMeeting(id) {
        return await db.query("DELETE FROM course_meeting WHERE id = ?", [id]);
    },

    async inputAbsence(absence) {
        let newAbsence = await db.query(
            "INSERT INTO course_meeting_absence (id_course_meeting, id_user, status) VALUES (?, ?, ?)",
            [
                absence.id_course_meeting,
                absence.id_user,
                absence.status
            ]
        );
        return absence;
    },

    async deleteAbsence(id) {
        return await db.query("DELETE FROM course_meeting_absence WHERE id_course_meeting = ?", [id]);
    },

    async getAbsence(id) {
        let [meeting] = await db.query("SELECT status FROM course_meeting_absence WHERE id_course_meeting = ?", [
            id,
        ]);
        return meeting[0];
    }
}

module.exports = CourseMeetingRepository;