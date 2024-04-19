const db = require("../../core/database");

const TaskRepository = {
    async getAllTask() {
        var all = [];
        let [task] = await db.query("SELECT * FROM task");
        all = all.concat(task);
        return all;
    },
    async getCourseTask(id) {
        let [task] = await db.query("SELECT * FROM task WHERE id_course = ?", [
            id,
        ]);
        return task;
    },
    async getTask(id) {
        let [task] = await db.query("SELECT * FROM task WHERE id = ?", [id]);
        return task[0];
    },
    async createTask(task) {
        let [created] = await db.query(
            "INSERT into task (id, id_course, name, description, deadline) values (?,?,?,?,?)",
            [
                task.id,
                task.id_course,
                task.name,
                task.description,
                task.deadline,
            ]
        );
        if (!created) return null;
        return this.getTask(created.insertId);
    },
    async updateTask(task) {
        let updated = await db.query(
            "UPDATE task SET id_course = ?, name = ?, description = ?, deadline = ? WHERE id = ?",
            [
                task.id_course,
                task.name,
                task.description,
                task.deadline,
                task.id,
            ]
        );
        if (!updated) return null;
        return this.getTask(task.id);
    },
    async deleteTask(id) {
        return await db.query("DELETE FROM task WHERE id = ?", [id]);
    },
};

module.exports = TaskRepository;
