const TaskSubmissionRepository = require("../repository/taskSubmission.repository");
const CourseRepository = require("../repository/course.repository");
const CourseTaskRepository = require("../repository/courseTask.repository");
const UserRepository = require("../repository/user.repository");

const TaskSubmissionService = {

    async getLastId(req, res) {
        try {
            const lastId = await TaskSubmissionRepository.getLastId();
            if (lastId === null)
                return res.status(500).json({message: "Failed to fetch last id"});
            res.status(200).json({lastId: lastId});
        } catch (error) {
            res.status(500).json({message: 'Error fetching last id', error: error });
        }
    },

    async addSubmission(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send('No files were uploaded.');
            }

            if (req.file.size > 10 * 1024 * 1024) { // 10 MB dalam byte
                return res.status(400).json({message: 'File terlalu besar. Maksimum 10 MB diizinkan.'});
            }

            const courseTask = await CourseTaskRepository.getCourseTask(req.body.id_course_task);
            if (!courseTask)
                return res.status(400).json({message: "Course task not found" });

            const user = await UserRepository.getUser(req.body.id_user);
            if (!user)
                return res.status(400).json({message: "User not found" });

            // const fileData = {
            //     filename: req.file.originalname,
            //     content: req.file.buffer
            // };
            
            const submission = {
                id_course_task: req.body.id_course_task,
                id_user: req.body.id_user,
                file: req.file.buffer,
                filename : req.file.originalname,
            }

            const addedSubmission = await TaskSubmissionRepository.addSubmission(submission);

            if (addedSubmission === null)
                return res.status(500).json({message: "Failed to add submission"});
            
            res.status(200).json({
                    data: addedSubmission,
                    message: 'Submission added successfully'
                });
            
        } catch (error) {
            res.status(500).json({
                message: 'Error adding submission',
                error:error
            });
        }
    },

    async updateSubmission(req, res) {
        try {
            const submission = await TaskSubmissionRepository.getSubmission(req.body.id);
            const courseTask = await CourseTaskRepository.getCourseTask(req.body.id_course_task);

            if (!submission)
                return res.status(400).json({message: "Submission not found" });
            if (!courseTask)
                return res.status(400).json({message: "Course task not found" });
            if (!req.file) {
                return res.status(400).send('No files were uploaded.');
            }
            if (req.file.size > 10 * 1024 * 1024) { // 10 MB dalam byte
                return res.status(400).json({message: 'File terlalu besar. Maksimum 10 MB diizinkan.'});
            }
            
            const newSubmission = {
                id: req.body.id,
                id_course_task: req.body.id_course_task,
                id_user: req.body.id_user,
                file: req.file.buffer,
                filename : req.file.originalname,
                grade: req.body.grade,
            }

            const updatedSubmission = await TaskSubmissionRepository.updateSubmission(newSubmission);

            if (!updatedSubmission)
                return res.status(500).json({message: "Failed to update submission"});
            
            res.status(200).json({
                    data: updatedSubmission,
                    message: 'Submission updated successfully'
                });
            
        } catch (error) {
            res.status(500).json({
                message: 'Error updating submission',
                error:error
            });
        }
    },

    async getAllSubmission(req, res) {
        try{
            const allSubmissions = await TaskSubmissionRepository.getAllSubmission()
            res.status(200).json(allSubmissions);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteSubmission(req, res) {
        try {
            const id = req.params.id;
            await TaskSubmissionRepository.deleteSubmission(id);
            res.status(200).json({ message: 'Task deleted successfully from the course' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting task from the course' });
        }
    },

    async getAllSubmissionByCourseTaskId(req, res) {
        try{
            const courseTask = await CourseTaskRepository.getCourseTask(req.params.courseTaskId);
            if (!courseTask)
                return res.status(400).json({message: "Course task not found" });

            const allSubmissionsByCourseTask = await TaskSubmissionRepository.getAllSubmissionByCourseTask(req.params.courseTaskId);
            res.status(200).json(allSubmissionsByCourseTask);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getSubmission(req, res) {
        try {
            const id = req.params.id;
            const submission = await TaskSubmissionRepository.getSubmission(id);
            if (!submission) {
                res.status(404).json({ message: "Submission not found" });
                return;
            }
            res.json(submission);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getNumberofSubmissionByCourseTaskId(req, res) {
        try {
            const courseTask = await CourseTaskRepository.getCourseTask(req.params.courseTaskId);
            if (!courseTask)
                return res.status(400).json({message: "Course task not found" });

            const count = await TaskSubmissionRepository.getNumberofSubmissionByCourseTask(req.params.courseTaskId);
            if (!count)
                return res.status(500).json({message: "Failed to fetch number of submission by course task"});
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching number of submission by course task', error: error });
        }
    },

    async downloadSubmission(req, res) {
        try {
            const id = req.params.id;
            const submission = await TaskSubmissionRepository.downloadSubmission(id);
            if (!submission) {
                res.status(404).json({ message: "Submission not found" });
                return;
            }
            res.setHeader('Content-Disposition', 'attachment; filename=' + submission.filename);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(submission.file);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getSubmissionByUser(req, res) {
        try {
            const user = await UserRepository.getUser(req.params.userId);
            if (user.length === 0 || !user)
                return res.status(400).json({message: "User not found" });

            const id = req.params.id;
            const submission = await TaskSubmissionRepository.getSubmissionByUser(req.params.userId);
            if (!submission) {
                res.status(404).json({ message: "Submission not found" });
                return;
            }
            res.json(submission);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getSubmissionByUserAndCourseTask(req, res) {
        try {
            const courseTaskId = req.params.courseTaskId;
            const courseTask = await CourseTaskRepository.getCourseTask(courseTaskId);
            if (!courseTask)
                return res.status(400).json({message: "Course task not found" });

            const userId = req.params.userId;
            const user = await UserRepository.getUser(userId);
            if (user.length === 0 || !user)
                return res.status(400).json({message: "User not found" });
            
            const submission = await TaskSubmissionRepository.getSubmissionByUserAndCourseTask(courseTaskId, userId);
            if (!submission) {
                res.status(404).json({ message: "Submission not found" });
                return;
            }
            res.json(submission);
        } catch (error) {
            res.status(500).send(error);
        }
    },

};

module.exports = TaskSubmissionService;