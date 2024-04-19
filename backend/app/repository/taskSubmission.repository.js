const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const TaskSubmissionRepository = {

    async getLastId() {
        const [rows] = await db.query("SELECT id FROM course_task_submission ORDER BY id DESC LIMIT 1");
        if (rows.length === 0)
            return 0;
        return rows[0].id;
    },

    async addSubmission(submission) {
        let created = null;
        // const id = uuidv4();
        // const id = await this.getLastId() + 1;
        created = await db.query("INSERT INTO course_task_submission (id_course_task, id_user, updated_at, filename, file) VALUES (?, ?, NOW(), ?, ?)", [
            submission.id_course_task, submission.id_user, submission.filename, submission.file
        ]);

        if (created.length === 0 || !created) 
            return null;

        return await this.getSubmission(submission.id);
    },

    async updateSubmission(submission) {
        let updated = null;
        updated = await db.query('UPDATE course_task_submission SET id_course_task = ?, id_user = ?, updated_at = NOW(), filename = ?, file = ?, grade = ? WHERE id = ?', [
            submission.id_course_task, submission.id_user, submission.filename, submission.file, submission.grade, submission.id
        ]);
        if (!updated)
            return null;
        return await this.getSubmission(submission.id);
    },

    async deleteSubmission(id) {
        return await db.query("DELETE FROM course_task_submission WHERE id = ?", [id]);
    },

    async getAllSubmission() {
        var all = []
        let [submissions] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission")
        all = all.concat(submissions);
        return all;
    },

    async getAllSubmissionByCourseTask(courseTaskId) {
        var all = []
        let [submissions] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id_course_task = ?", [courseTaskId])
        all = all.concat(submissions);
        return all;
    },

    async getSubmission(id) {
        let [submission] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id = ?", [id]);
        return submission[0];
    },

    async getNumberofSubmissionByCourseTask(courseTaskId) {
        let [count] = await db.query("SELECT COUNT(*) AS count FROM course_task_submission WHERE id_course_task = ?", [courseTaskId]);
        return count[0];
    },

    async downloadSubmission(id) {
        let [submission] = await db.query("SELECT filename, file FROM course_task_submission WHERE id = ?", [id]);
        return submission[0];
    },

    async getSubmissionByUser(id) {
        var all = [];
        let [submission] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id_user = ?", [id]);
        all = all.concat(submission);
        return all;
    },

    async getSubmissionByUserAndCourseTask(courseTaskId, userId) {
        var all = [];
        let [submission] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id_course_task =? AND id_user = ?", [courseTaskId, userId]);
        all = all.concat(submission);
        return all;
    },

};

module.exports = TaskSubmissionRepository;
