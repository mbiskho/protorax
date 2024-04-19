const CourseStudentRepository = require("../repository/courseStudent.repository");
const UserRepository = require("../repository/user.repository");

const CourseStudentService = {

    async addCourseStudent(req, res) {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
            const student = await UserRepository.getUser(studentId);

            if (!student[0])
                return res.status(404).json({message: "Student not found" }); // If user does not exist, return 404
            
            const courseStudent = {
                id_course: courseId,
                id_user: studentId,
            }

            const addedCourseStudent = await CourseStudentRepository.addCourseStudent(courseStudent);

            if (!addedCourseStudent)
                return res.status(500).json({message: "Failed to add student to the course"});
            
            res.status(200).json({
                    data: addedCourseStudent,
                    message: 'Student added successfully to the course'
                });
            
        } catch (error) {
            res.status(500).json({
                message: 'Error adding student to the course',
                error:error
            });
        }
    },

    async deleteCourseStudent(req, res) {
        try {
            const courseStudent = {
                id_course: req.params.courseId,
                id_user: req.params.studentId,
            }
            await CourseStudentRepository.deleteCourseStudent(courseStudent);
            res.status(200).json({ message: 'Student deleted successfully from the course' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting student from the course' });
        }
    },

    async getAllStudentByCourseId(req, res) {
        try{
            const allStudentByCourseId = await CourseStudentRepository.getAllStudentByCourseId(req.params.courseId)
            res.status(200).json(allStudentByCourseId);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getNumberofStundentByCourseId(req, res) {
        try {
            const courseId = req.params.courseId;
            const [count] = await CourseStudentRepository.getNumberofStundentByCourseId(courseId);
            if (!count[0])
                return res.status(500).json({message: "Failed to fetch number of student by course"});
            res.status(200).json(count[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching number of student by course', error: error });
        }
    }

};

module.exports = CourseStudentService;