const db = require("../../core/database");

const Materi = {
    async getLastId() {
        const [rows] = await db.query("SELECT id FROM course_materi ORDER BY id DESC LIMIT 1");
        if (rows.length === 0)
            return 0;
        return rows[0].id;
    },

    async addMateri(materi) {
        let created = null;
        created = await db.query("INSERT INTO course_materi (id_course, name) VALUES (?, ?)", [
            materi.id_course, materi.name
        ]);

        if (created.length === 0 || !created)
            return null;

        // return await this.getMateri(this.getLastId());
        return materi;
    },

    async updateMateri(materi) {
        let updated = null;
        updated = await db.query('UPDATE course_materi SET id_course = ?, name = ? WHERE id = ?', [
            materi.id_course, materi.name, materi.id
        ]);
        if (!updated)
            return null;
        // return await this.getMateri(materi.id);
        return materi;
    },

    async deleteMateri(id) {
        return await db.query("DELETE FROM course_materi WHERE id = ?", [id]);
    },

    async getAllMateri() {
        var all = []
        let [materi] = await db.query("SELECT id, id_course, name FROM course_materi")
        all = all.concat(materi);
        return all;
    },

    async getAllMateriByCourseId(courseId) {
        var all = []
        let [materi] = await db.query("SELECT id, id_course, name FROM course_materi WHERE id_course = ?", [courseId])
        all = all.concat(materi);
        return all;
    },

    async getMateri(id) {
        let [materi] = await db.query("SELECT * FROM course_materi WHERE id = ?", [id]);
        return materi[0];
    },

    async getNumberofMateriByCourseId(courseId) {
        let [count] = await db.query("SELECT COUNT(*) AS count FROM course_materi WHERE id_course = ?", [courseId]);
        return count[0];
    }

};

module.exports = Materi;