const CourseRepository = require("../repository/course.repository");
const TaskRepository = require("../repository/task.repository");

const TaskService = {
    async listTasks(req, res) {
        try {
            const tasks = await TaskRepository.getAllTask();
            if (tasks.length === 0) {
                res.status(404).json({ message: "No Tasks found" });
                return;
            }
            res.json({
                message: "Tasks found successfully",
                data: tasks,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getCourseTask(req, res) {
        try {
            const id = req.params.id;
            const tasks = await TaskRepository.getCourseTask(id);
            if (tasks.length === 0) {
                res.status(404).json({ message: "No Tasks found" });
                return;
            }
            res.json({
                message: `Tasks for course with id ${id} found successfully`,
                data: tasks,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getTask(req, res) {
        try {
            const id = req.params.id;
            const task = await TaskRepository.getTask(id);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.json({
                message: "Task found successfully",
                data: task,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async createTask(req, res) {
        try {
            const courseId = req.body.id_course;
            const findCourse = await CourseRepository.getCourse(courseId);
            if (!findCourse) {
                res.status(404).json({
                    message: `Course with id ${courseId} not found`,
                });
                return;
            }

            const task = {
                id_course: req.body.id_course,
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
            };
            const createdTask = await TaskRepository.createTask(task);
            res.json({
                message: "Task created successfully",
                data: createdTask,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async updateTask(req, res) {
        try {
            const id = req.params.id;
            const findTask = await TaskRepository.getTask(id);
            if (!findTask) {
                res.status(404).json({ message: "Task not found" });
                return;
            }

            const courseId = req.body.id_course;
            const findCourse = await CourseRepository.getCourse(courseId);
            if (!findCourse) {
                res.status(404).json({
                    message: `Course with id ${courseId} not found`,
                });
                return;
            }

            const task = {
                id: id,
                id_course: req.body.id_course,
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
            };
            const updatedTask = await TaskRepository.updateTask(task);
            res.json({
                message: "Task updated successfully",
                data: updatedTask,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async deleteTask(req, res) {
        try {
            const id = req.params.id;
            const findTask = await TaskRepository.getTask(id);
            if (!findTask) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            await TaskRepository.deleteTask(id);
            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

module.exports = TaskService;
