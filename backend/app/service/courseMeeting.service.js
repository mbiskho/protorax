const CourseMeetingRepository = require("../repository/courseMeeting.repository");
const CourseRepository = require("../repository/course.repository");
const UserRepository = require("../repository/user.repository");

const CourseMeetingService = {
    async listMeeting(req, res) {
        try {
            const id = req.params.id;
            const meeting = await CourseMeetingRepository.getAllMeeting(id);
            if (meeting.length === 0) {
                res.status(404).json({ message: "No courses meeting found" });
                return;
            }
            res.json({
                message: "Courses meeting found successfully",
                data: meeting,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async createMeeting(req, res) {
        try {
            const courseId = req.params.id;
            const findCourse = await CourseRepository.getCourse(courseId);
                if (!findCourse) {
                    res.status(404).json({ message: "Course Meeting not found" });
                    return;
                }

                const meeting = {
                    id_course: courseId,
                    name: req.body.name,
                };
                const createMeeting = await CourseMeetingRepository.addCourseMeeting(meeting);
                res.status(200).json(createMeeting);
            } catch (error) {
                res.status(500).send(error);
        } 
    },

    async getMeeting(req, res) {
        try{
            const id = req.params.id;
            const meeting = await CourseMeetingRepository.getMeetingById(id);
            if (!meeting) {
                res.status(404).json({ message: "Course not found" });
                return;
            }
            res.json({
                message: "Course found successfully",
                data: meeting,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteMeeting(req, res) {
        try {
            await CourseMeetingRepository.deleteMeeting(req.params.id);
            res.status(200).send({ message: 'Meeting deleted successfully' });
        } catch (error) {
          res.status(500).send({ message: 'Error deleting Meeting' });
        }
    },

    async deleteAbsence(req, res) {
        try {
            await CourseMeetingRepository.deleteAbsence(req.params.id);
            res.status(200).send({ message: 'Meeting deleted successfully' });
        } catch (error) {
          res.status(500).send({ message: 'Error deleting Meeting' });
        }
    },
    
    async inputAbsence(req, res) {
        const idMeeting = req.params.id;
        const idUser = req.params.idUser;

        try {
            const absence = {
                id_course_meeting: idMeeting,
                id_user: idUser,
                status: 'Present',
            }

            const newAbsence = await CourseMeetingRepository.inputAbsence(absence);
            if (!newAbsence)
                res.status(500).json({
                    message: "Failed to add announcement"
                });
            res.status(200).json('Success to update');
        }catch (error) {
            // res.status(500).send(error);
            res.status(500).json({message: `Name: '${idAnnouncement}' couldn't be found `});
        }
    },

    async getAbsence(req, res) {
        try{
            const id = req.params.id;
            const status = await CourseMeetingRepository.getAbsence(id);
            if (!status) {
                res.status(404).json(null);
            }
            res.status(200).json(status);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = CourseMeetingService;