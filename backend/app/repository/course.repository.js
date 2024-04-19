const db = require("../../core/database");
const { v4: uuidv4 } = require("uuid");

const CourseRepository = {
    async getAllCourse() {
        var all = [];
        let [course] = await db.query("SELECT * FROM course");
        all = all.concat(course);
        return all;
    },
    async getCourse(id) {
        let [course] = await db.query("SELECT * FROM course WHERE id = ?", [
            id,
        ]);
        return course[0];
    },
    async createCourse(course) {
        const id = uuidv4();
        let created = await db.query(
            "INSERT into course (id, name, id_teacher, rating, description, photo, category, level, price, status) values (?,?,?,?,?,?,?,?,?,?)",
            [
                id,
                course.name,
                course.id_teacher,
                course.rating,
                course.description,
                course.photo,
                course.category,
                course.level,
                course.price,
                course.status,
            ]
        );
        if (!created) return null;
        return this.getCourse(id);
    },
    async updateCourse(course) {
        let updated = await db.query(
            "UPDATE course SET name = ?, id_teacher = ?, rating = ?, description = ?, photo = ?, category = ?, level = ?, price = ?, status = ? WHERE id = ?",
            [
                course.name,
                course.id_teacher,
                course.rating,
                course.description,
                course.photo,
                course.category,
                course.level,
                course.price,
                course.status,
                course.id,
            ]
        );
        if (!updated) return null;
        return this.getCourse(course.id);
    },
    async deleteCourse(id) {
        return await db.query("DELETE FROM course WHERE id = ?", [id]);
    },
    async getTeacher(id_teacher) {
        let [teacher] = await db.query(
            "SELECT id, email, username, role FROM user WHERE id = ? AND role = 'Guru'",
            [id_teacher]
        );
        return teacher[0];
    },
    async removeTeacher(id) {
        return await db.query(
            "UPDATE course SET id_teacher = NULL WHERE id = ?",
            [id]
        );
    },
};

module.exports = CourseRepository;
