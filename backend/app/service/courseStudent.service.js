const CourseStudentRepository = require("../repository/courseStudent.repository");

const CourseStudentService = {

    async addCourseStudent(req, res) {
        try {
            // const userId = req.body.id_user; // Get the id_user from the request body
            // const user = await UserRepository.getUserById(userId); // Assume a function getUserById exists in UserRepository to fetch user details by id

            // if (!user) return res.status(404).json({ message: "User not found" }); // If user does not exist, return 404
            
            const courseStudent = {
                id_course: req.params.courseId,
                id_user: req.params.studentId,
            }

            const addedCourseStudent = await CourseStudentRepository.addCourseStudent(courseStudent);
            if (!addedCourseStudent)
                res.status(500).json({
                    message: "Failed to add student to the course"
                });
            res.status(200).json({data: addedCourseStudent, message: 'Student added successfully to the course'});
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteCourseStudent(req, res) {

        const courseStudent = {
            id_course: req.params.courseId,
            id_user: req.params.studentId,
        }

        try {
            await CourseStudentRepository.deleteCourseStudent(courseStudent);
            res.status(200).json({ message: 'Student deleted successfully from the course' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting student from the course' });
        }
    },

    async getAllStudentByCourseId(req, res) {
        try{
            const allStudentByCourseId = await CourseStudentRepository.getAllStudentByCourseId(req.params.courseId)
            res.json(allStudentByCourseId);
        } catch (error) {
            res.status(500).send(error);
        }
    },


};

module.exports = CourseStudentService;