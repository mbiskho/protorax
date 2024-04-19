const express = require("express");
const router = express.Router();
const { wrap } = require("../core/error/error-handler");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Import Services
 * used for importing service functions
 */
const UserService = require("../app/service/user.service");
const CourseService = require("../app/service/course.service");
const TaskService = require("../app/service/task.service");
const CourseStudentService = require('../app/service/courseStudent.service')
const CourseTeacherService = require('../app/service/courseTeacher.service')
const AnnouncementService = require('../app/service/announcement.service')
const CourseTaskService = require('../app/service/courseTask.service')
const TaskSubmissionService = require('../app/service/taskSubmission.service')
const PaymentService = require('../app/service/payment.service');
const { calculateTotalPayments } = require('../app/service/payment.service');
const MateriService = require('../app/service/materi.service')
const FileMateriService = require('../app/service/fileMateri.service')
const CourseMeetingService = require("../app/service/courseMeeting.service");

/**
 * User management
 */
router.get("/user", wrap(UserService.listUsers));
router.post("/user", wrap(UserService.createUser))
router.get("/user/:id", wrap(UserService.getUser));
router.put("/user/:id", wrap(UserService.updateUser))
router.delete("/user/:id", wrap(UserService.deleteUser))

/**
 * Course management
 */
router.get("/courses", authorize, CourseService.listCourses);
router.get("/courses/:id", CourseService.getCourse);
router.post("/courses", upload.single("photo"), CourseService.createCourse);
router.put("/courses/:id", upload.single("photo"), CourseService.updateCourse);
router.delete("/courses/:id", CourseService.deleteCourse);
router.get("/courses", wrap(CourseService.listCourses));
router.get("/courses/:id", wrap(CourseService.getCourse));
router.post("/courses", upload.single("photo"), wrap(CourseService.createCourse));
router.put("/courses/:id", upload.single("photo"), wrap(CourseService.updateCourse));
router.delete("/courses/:id", CourseService.deleteCourse);
router.get("/courses", wrap(CourseService.listCourses));
router.get("/courses/:id", wrap(CourseService.getCourse));
router.post("/courses", wrap(CourseService.createCourse));
router.put("/courses/:id", wrap(CourseService.updateCourse));
router.delete("/courses/:id",wrap( CourseService.deleteCourse));

/**
 * Course Teacher management
 */
router.get("/courses/:id/teacher", CourseService.getTeacher);
router.delete("/courses/:id/teacher", CourseService.removeTeacher);

/**
 * Course Task management
 */
router.get("/tasks", wrap(TaskService.listTasks));
router.get("/courses/:id/tasks", wrap(TaskService.getCourseTask));
router.get("/tasks/:id", wrap(TaskService.getTask));
router.post("/tasks", wrap(TaskService.createTask));
router.put("/tasks/:id", wrap(TaskService.updateTask));
router.delete("/tasks/:id", wrap(TaskService.deleteTask));

/**
 * Course Meeting
 */
router.post('/courses/:id/meeting', wrap(CourseMeetingService.createMeeting));
router.post('/absence/:idUser/meeting/:id', wrap(CourseMeetingService.inputAbsence));
router.get('/courses/:id_course/meeting/:id', wrap(CourseMeetingService.getMeeting));
router.get('/courses/:id/meeting', wrap(CourseMeetingService.listMeeting));
router.delete('/courses/:id/meeting', wrap(CourseMeetingService.deleteMeeting));
router.delete('/absence/:id', wrap(CourseMeetingService.deleteAbsence));
router.get('/absence/:id', wrap(CourseMeetingService.getAbsence));

/**
 * Student in Course Service
 */
router.post('/course/:courseId/students/:studentId', wrap(CourseStudentService.addCourseStudent));
router.get('/course/:courseId/students/', wrap(CourseStudentService.getAllStudentByCourseId));
router.delete('/course/:courseId/students/:studentId', wrap(CourseStudentService.deleteCourseStudent));
router.get('/course/:courseId/students/count', wrap(CourseStudentService.getNumberofStundentByCourseId));

/**
 * Teacher in Course Service
 */
router.post('/course/:courseId/teacher/:teacherId', wrap(CourseTeacherService.addCourseTeacher));
router.get('/course/:courseId/teacher/', wrap(CourseTeacherService.getTeacherByCourseId));
router.delete('/course/:courseId/teacher/', wrap(CourseTeacherService.deleteCourseTeacher));

/**
 * Announcement
 */
router.post('/announcement/:id/create', wrap(AnnouncementService.addAnnouncement));
router.get('/announcement', wrap(AnnouncementService.listAnnouncement));
router.put('/announcement/:id/update/:idUser', wrap(AnnouncementService.updateAnnouncement));
router.delete('/announcement/:id/delete', wrap(AnnouncementService.deleteAnnouncement));
router.put('/announcement/:id', wrap(AnnouncementService.pinAnnouncement));
router.get('/announcement/sort', wrap(AnnouncementService.sortAnnouncement));
router.get('/announcement/:id', wrap(AnnouncementService.detailAnnouncement));
router.post('/announcement/search', wrap(AnnouncementService.searchAnnouncement));

/**
 * Course Task
 */
router.post('/assignment', upload.none(), wrap(CourseTaskService.addCourseTask)); //
router.put('/assignment', wrap(CourseTaskService.updateCourseTask)); //
router.get('/assignment/all', wrap(CourseTaskService.getAllTasks)); //
router.get('/assignment/course/:courseId', wrap(CourseTaskService.getAllTasksByCourseId)); //
router.get('/assignment/count/:courseId', wrap(CourseTaskService.getNumberofTaskByCourseId)); //
router.get('/assignment/last-id', wrap(CourseTaskService.getLastId)); //
router.delete('/assignment/:id', wrap(CourseTaskService.deleteCourseTask)); //
router.get('/assignment/:id', wrap(CourseTaskService.getCourseTask)); //

/**
 * Course Task Submission
 */
router.post('/submission', upload.single('file'), wrap(TaskSubmissionService.addSubmission)); //
router.put('/submission', upload.single('file'), wrap(TaskSubmissionService.updateSubmission)); //
router.get('/submission/all', wrap(TaskSubmissionService.getAllSubmission)); //
router.get('/submission/course-task/:courseTaskId', wrap(TaskSubmissionService.getAllSubmissionByCourseTaskId)); //
router.get('/submission/course-task/:courseTaskId/user/:userId', wrap(TaskSubmissionService.getSubmissionByUserAndCourseTask)); //
router.get('/submission/count/:courseTaskId', wrap(TaskSubmissionService.getNumberofSubmissionByCourseTaskId)); //
router.get('/submission/last-id', wrap(TaskSubmissionService.getLastId)); //
router.get('/submission/download/:id', wrap(TaskSubmissionService.downloadSubmission)); //
router.get('/submission/user/:userId', wrap(TaskSubmissionService.getSubmissionByUser)); //
router.delete('/submission/:id', wrap(TaskSubmissionService.deleteSubmission)); //
router.get('/submission/:id', wrap(TaskSubmissionService.getSubmission)); //
router.get('/submission/:id/download', wrap(TaskSubmissionService.downloadSubmission)); //


/**
 * Payment
 */
router.get('/payment', wrap(PaymentService.getStudentToPayment));

router.get('/payments', async (req, res) => {
    try {
        const totalPayments = await calculateTotalPayments();
        res.json({ total: totalPayments });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/payments', async (req, res) => {
    try {
        const { userId, courseId, amount } = req.body;
        const newPayment = await addPayment(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

/**
 * Course Materi
 */
router.post('/materi', wrap(MateriService.addMateri));
router.put('/materi', wrap(MateriService.updateMateri));
router.get('/materi/all', wrap(MateriService.getAllMateri));
router.get('/materi/course/:courseId', wrap(MateriService.getAllMateriByCourseId));
router.get('/materi/count/:courseId', wrap(MateriService.getNumberofMateriByCourseId));
router.get('/materi/last-id', wrap(MateriService.getLastId));
router.delete('/materi/:id', wrap(MateriService.deleteMateri));
router.get('/materi/:id', wrap(MateriService.getMateri));

/**
 * Course Materi
 */
router.post('/file-materi', upload.single('file'), wrap(FileMateriService.addFileMateri)); //
router.put('/file-materi', upload.single('file'), wrap(FileMateriService.updateFileMateri)); //
router.get('/file-materi/all', wrap(FileMateriService.getAllFileMateri)); //
router.get('/file-materi/materi/:materiId', wrap(FileMateriService.getAllFileByMateriId)); //
// router.get('/submission/course-task/:courseTaskId/user/:userId', wrap(TaskSubmissionService.getSubmissionByUserAndCourseTask)); //
router.get('/file-materi/count/:materiId', wrap(FileMateriService.getNumberofFileByMateriId)); //
router.get('/file-materi/last-id', wrap(FileMateriService.getLastId)); //
router.get('/file-materi/download/:id', wrap(FileMateriService.downloadFileMateri)); //
// router.get('/submission/user/:userId', wrap(TaskSubmissionService.getSubmissionByUser)); //
router.delete('/file-materi/:id', wrap(FileMateriService.deleteFileMateri)); //
router.get('/file-materi/:id', wrap(FileMateriService.getFileMateri)); //
router.get('/file-materi/:id/download', wrap(FileMateriService.downloadFileMateri)); //

/**
 * [Domain] Base
 */
router.get("/", (req, res) => {
    return res.send("Server is Healthy");
});
router.post("/login", wrap(UserService.autenticate));
module.exports = router;
