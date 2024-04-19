const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const CourseTaskRepository = {

    async getLastId() {
        const [rows] = await db.query("SELECT id FROM course_task ORDER BY id DESC LIMIT 1");
        if (rows.length === 0)
            return 0;
        return rows[0].id;
    },

    async addCourseTask(courseTask) {
        let created = null;
        // const id = uuidv4();
        const id = await this.getLastId() + 1;
        created = await db.query("INSERT INTO course_task (id_course, id, name, description, created_at, updated_at, deadline) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)", [
            courseTask.id_course, id, courseTask.name, courseTask.description, courseTask.deadline
        ]);

        if (created.length === 0 || !created) 
            return null;

        return await this.getCourseTask(courseTask.id);
    },

    async updateCourseTask(courseTask) {
        let updated = null;
        updated = await db.query('UPDATE course_task SET id_course = ?, name = ?, description = ?, updated_at = NOW(), deadline = ? WHERE id = ?', [
            courseTask.id_course, courseTask.name, courseTask.description, courseTask.deadline, courseTask.id
        ]);
        if (!updated) 
            return null;
        return await this.getCourseTask(courseTask.id);
    },

    async deleteCourseTask(id) {
        return await db.query("DELETE FROM course_task WHERE id = ?", [id]);
    },

    async getAllTasks() {
        var all = []
        let [courseTask] = await db.query("SELECT id_course, id, name, description, created_at, updated_at, deadline FROM course_task")
        all = all.concat(courseTask);
        return all;
    },

    async getAllTasksByCourseId(courseId) {
        var all = []
        let [courseTask] = await db.query("SELECT id_course, id, name, description, created_at, updated_at, deadline FROM course_task WHERE id_course = ?", [courseId])
        all = all.concat(courseTask);
        return all;
    },

    async getCourseTask(id) {
        let [courseTask] = await db.query("SELECT * FROM course_task WHERE id = ?", [id]);
        return courseTask[0];
    },

    async getNumberofTaskByCourseId(courseId) {
        let [count] = await db.query("SELECT COUNT(*) AS count FROM course_task WHERE id_course = ?", [courseId]);
        return count[0];
    }

};

module.exports = CourseTaskRepository;
