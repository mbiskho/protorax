const CourseTeacherRepository = require("../repository/courseTeacher.repository");

const CourseTeacherService = {

    async addCourseTeacher(req, res) {
        try {
            const courseTeacher = {
                id_course: req.params.courseId,
                id_teacher: req.body.id_teacher,
            }

            const addedCourseTeacher = await CourseTeacherRepository.addCourseTeacher(courseTeacher);

            if (!addedCourseTeacher)
                res.status(500).json({
                    message: "Failed to add teacher to the course"
                });
            res.status(200).json(addedCourseTeacher);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteCourseTeacher(req, res) {
            
        const courseId = req.params.courseId;

        try {
            await CourseTeacherRepository.deleteCourseTeacher(courseId);
            res.status(200).json({ message: 'Teacher deleted successfully from the course' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting teacher from the course' });
        }
    },

    async getTeacherByCourseId(req, res) {

        const courseId = req.params.courseId;

        try {
            const teacher = await CourseTeacherRepository.getTeacherByCourseId(courseId);
            if (!teacher)
                res.status(404).json({ message: 'Teacher not found' });
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching teacher' });
        }
    },

};

module.exports = CourseTeacherService;