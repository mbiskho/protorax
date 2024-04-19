const CourseTeacherRepository = require("../repository/courseTeacher.repository");
const UserRepository = require("../repository/user.repository");

const CourseTeacherService = {

    async addCourseTeacher(req, res) {
        try {
            const teacherId = req.params.teacherId;
            const courseId = req.params.courseId;
            const teacher = await UserRepository.getUser(teacherId);
            if (!teacher[0])
                return res.status(404).json({ message: "Teacher not found" });

            const courseTeacher = {
                id_course: courseId,
                id_teacher: teacherId,
            }
            const addedCourseTeacher = await CourseTeacherRepository.addCourseTeacher(courseTeacher);

            if (!addedCourseTeacher)
                return res.status(500).json({message: "Failed to add teacher to the course"});
                
            res.status(200).json({message: "Teacher added to the course successfully", data: addedCourseTeacher});
        } catch (error) {
            res.status(500).json({message: "Failed to add teacher to the course", error: error});
        }
    },

    async deleteCourseTeacher(req, res) {
        try {
            const courseId = req.params.courseId;
            await CourseTeacherRepository.deleteCourseTeacher(courseId);
            res.status(200).json({ message: 'Teacher deleted successfully from the course' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting teacher from the course' });
        }
    }, 

    async getTeacherByCourseId(req, res) {
        try {
            const courseId = req.params.courseId;
            const teacher = await CourseTeacherRepository.getTeacherByCourseId(courseId);

            if (!teacher)
                return res.status(200).json();

            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching teacher', error: error });
        }
    },

};

module.exports = CourseTeacherService;