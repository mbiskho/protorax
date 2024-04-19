const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');
const UserRepository = require("./user.repository");

const CourseStudentRepository = {

    async addCourseStudent(courseStudent) {
        let created = null;
        created = await db.query("INSERT INTO course_student (id_course, id_user) VALUES (?, ?)", [courseStudent.id_course, courseStudent.id_user]);
        if (!created) 
            return null;
        return await this.getCourseStudent(courseStudent);
    },

    async deleteCourseStudent(courseStudent) {
        return await db.query("DELETE FROM course_student WHERE id_course = ? AND id_user = ?", [courseStudent.id_course, courseStudent.id_user]);
    },

    async getAllStudentByCourseId(courseId) {
        var all = []
        let [studentIds] = await db.query("SELECT id_user FROM course_student WHERE id_course = ?", [courseId])
        all = all.concat(studentIds);

        for (let i = 0; i < all.length; i++) {
            let [student] = await UserRepository.getUser(all[i].id_user);
            all[i] = student;
        }
        
        return all;
    },

    async getCourseStudent(courseStudent) {
        let [courseStudentFound] = await db.query("SELECT * FROM course_student WHERE id_course = ? AND id_user = ?", [courseStudent.id_course, courseStudent.id_user]);
        return courseStudentFound[0];
    },

    async getNumberofStundentByCourseId(courseId) {
        return await db.query("SELECT COUNT(*) AS count FROM course_student WHERE id_course = ?", [courseId]);
    }

};

module.exports = CourseStudentRepository;
