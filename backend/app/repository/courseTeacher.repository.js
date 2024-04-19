const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('./user.repository');

const CourseStudentRepository = {

    async addCourseTeacher(courseTeacher) {
        let added = null;
        added = await db.query("UPDATE course SET id_teacher = ? WHERE course.id = ?", [courseTeacher.id_teacher, courseTeacher.id_course]);
        return this.getTeacherByCourseId(courseTeacher.id_course);
    },

    async deleteCourseTeacher(courseId) {
        return await db.query("UPDATE course SET id_teacher = NULL WHERE course.id = ?", [courseId]);
    },

    async getTeacherByCourseId(courseId) {
        let teacher = null;
        teacher = await db.query("SELECT id_teacher FROM course WHERE id = ?", [courseId]);
        if (teacher[0].length === 0)
            return null;
        let [teacherDetail] = await UserRepository.getUser(teacher[0][0].id_teacher);
        return teacherDetail;
    },

};

module.exports = CourseStudentRepository;
