const db = require("../../core/database");

const FileMateriRepository = {

    async getLastId() {
        const [rows] = await db.query("SELECT id FROM course_materi_file ORDER BY id DESC LIMIT 1");
        if (rows.length === 0)
            return 0;
        return rows[0].id;
    },

    async addFileMateri(fileMateri) {
        let created = null;
        created = await db.query("INSERT INTO course_materi_file (id_course_materi, file, name) VALUES (?, ?, ?)", [
            fileMateri.id_course_materi, fileMateri.file, fileMateri.name
        ]);

        if (created.length === 0 || !created)
            return null;

        // return await this.getFileMateri(await this.getLastId());
        delete fileMateri.file;
        return fileMateri;
    },

    async updateFileMateri(fileMateri) {
        let updated = null;
        updated = await db.query('UPDATE course_materi_file SET id_course_materi = ?, file = ?, name = ? WHERE id = ?', [
            fileMateri.id_course_materi, fileMateri.file, fileMateri.name, fileMateri.id
        ]);
        if (!updated)
            return null;
        // return await this.getFileMateri(fileMateri.id);
        delete fileMateri.file;
        return fileMateri;
    },

    async deleteFileMateri(id) {
        return await db.query("DELETE FROM course_materi_file WHERE id = ?", [id]);
    },

    async getAllFileMateri() {
        var all = []
        let [fileMateri] = await db.query("SELECT id, id_course_materi, name FROM course_materi_file")
        all = all.concat(fileMateri);
        return all;
    },

    async getAllFileByMateri(materiId) {
        var all = []
        let [fileMateri] = await db.query("SELECT id, id_course_materi, name FROM course_materi_file WHERE id_course_materi = ?", [materiId])
        all = all.concat(fileMateri);
        return all;
    },

    async getFileMateri(id) {
        let [fileMateri] = await db.query("SELECT id, id_course_materi, name FROM course_materi_file WHERE id = ?", [id]);
        return fileMateri[0];
    },

    async getNumberofFileByMateri(materiId) {
        let [count] = await db.query("SELECT COUNT(*) AS count FROM course_materi_file WHERE id_course_materi = ?", [materiId]);
        return count[0];
    },

    async downloadFileMateri(id) {
        let [fileMateri] = await db.query("SELECT name, file FROM course_materi_file WHERE id = ?", [id]);
        return fileMateri[0];
    },

    // async getSubmissionByUser(id) {
    //     var all = [];
    //     let [submission] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id_user = ?", [id]);
    //     all = all.concat(submission);
    //     return all;
    // },

    // async getSubmissionByUserAndCourseTask(courseTaskId, userId) {
    //     var all = [];
    //     let [submission] = await db.query("SELECT id, id_course_task, id_user, updated_at, filename, grade FROM course_task_submission WHERE id_course_task =? AND id_user = ?", [courseTaskId, userId]);
    //     all = all.concat(submission);
    //     return all;
    // },

};

module.exports = FileMateriRepository;
