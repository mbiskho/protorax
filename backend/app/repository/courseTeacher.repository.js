const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const CourseStudentRepository = {

    async addCourseTeacher(courseTeacher) {
        let added = null;
        if (db.query("SELECT * FROM course WHERE id = ? AND id_teacher IS NOT NULL", [courseTeacher.id_course]))
            return null;
        added = await db.query("UPDATE course SET id_teacher = ? WHERE course.id = ?", [courseTeacher.id_teacher, courseTeacher.id_course]);
        return courseTeacher;
    },

    async deleteCourseStudent(courseId) {
        return await db.query("UPDATE course SET id_teacher = NULL WHERE course.id = ?", [courseId]);
    },

    async getTeacherByCourseId(courseId) {
        let teacher = null;
        teacher = await db.query("SELECT id_teacher FROM course WHERE id = ?", [courseId]);
        if (!teacher) 
            return null
        return teacher;
    },

};

module.exports = CourseStudentRepository;
