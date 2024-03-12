const express = require("express");
const router = express.Router();
const { wrap } = require("../core/error/error-handler");

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


/**
 * User management
 */
router.get("/user", wrap(UserService.listUsers));
router.post("/user", wrap(UserService.createUser))
router.put("/user/:id", wrap(UserService.updateUser))
router.delete("/user/:id", wrap(UserService.deleteUser))

/**
 * Course management
 */
router.get("/courses", wrap(CourseService.listCourses));
router.get("/courses/:id", wrap(CourseService.getCourse));
router.post("/courses", wrap(CourseService.createCourse));
router.put("/courses/:id", wrap(CourseService.updateCourse));
router.delete("/courses/:id",wrap( CourseService.deleteCourse));

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
 * Student in Course Service
 */
router.post('/course/:courseId/students/:studentId', wrap(CourseStudentService.addCourseStudent));
router.get('/course/:courseId/students/', wrap(CourseStudentService.getAllStudentByCourseId));
router.delete('/course/:courseId/students/:studentId', wrap(CourseStudentService.deleteCourseStudent));

/**
 * Teacher in Course Service
 */
router.post('/course/:courseId/teacher/', wrap(CourseTeacherService.addCourseTeacher));
router.get('/course/:courseId/teacher/', wrap(CourseTeacherService.getTeacherByCourseId));
router.delete('/course/:courseId/teacher/', wrap(CourseTeacherService.deleteCourseTeacher));

/**
 * Announcement
 */
router.post('/announcement/:id/create', wrap(AnnouncementService.addAnnouncement));
router.get('/announcement', wrap(AnnouncementService.listAnnouncement));
router.put('/announcement/:id/update', wrap(AnnouncementService.updateAnnouncement));
router.delete('/announcement/:id/delete', wrap(AnnouncementService.deleteAnnouncement));
router.put('/announcement/:id/pin', wrap(AnnouncementService.pinAnnouncement));

/**
 * [Domain] Base
 */
router.get("/", (req, res) => {
    return res.send("Server is Healthy");
});
router.post("/login", wrap(UserService.autenticate));
module.exports = router;
