const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const CourseStudentRepository = {

    async addCourseStudent(courseStudent) {
        let created = null;
        console.log(courseStudent.id_course)
        console.log(courseStudent.id_user)
        created = await db.query("INSERT INTO course_student (id_course, id_user) VALUES (?, ?)", [courseStudent.id_course, courseStudent.id_user]);
        if (!created) 
            return null
        return courseStudent;
    },

    async deleteCourseStudent(courseStudent) {
        return await db.query("DELETE FROM course_student WHERE id_course = ? AND id_user = ?", [courseStudent.id_course, courseStudent.id_user]);
    },

    async getAllStudentByCourseId(courseId) {
        var all = await db.query("SELECT id_user FROM course_student WHERE id_course = ?", [courseId])
        return all;
    }

};

module.exports = CourseStudentRepository;
