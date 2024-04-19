const CourseTaskRepository = require("../repository/courseTask.repository");
const CourseRepository = require("../repository/course.repository");

const CourseTaskService = {

    async getLastId(req, res) {
        try {
            const lastId = await CourseTaskRepository.getLastId();
            if (lastId === null)
                return res.status(500).json({message: "Failed to fetch last id"});
            res.status(200).json({lastId: lastId});
        } catch (error) {
            res.status(500).json({message: 'Error fetching last id', error: error });
        }
    },

    async addCourseTask(req, res) {
        try {
            const courseId = req.body.id_course;
            const name = req.body.name;
            const description = req.body.description;
            const deadline = req.body.deadline;

            const course = await CourseRepository.getCourse(courseId);

            if (!course)
                return res.status(400).json({message: "Course not found" });
            
            const courseTask = {
                id_course: courseId,
                name: name,
                description: description,
                deadline: deadline
            }

            const addedCourseTask = await CourseTaskRepository.addCourseTask(courseTask);

            if (addedCourseTask === null)
                return res.status(500).json({message: "Failed to add course task"});
            
            res.status(200).json({
                    data: addedCourseTask,
                    message: 'Task added successfully to the course'
                });
            
        } catch (error) {
            res.status(500).json({
                message: 'Error adding task to the course',
                error:error
            });
        }
    },

    async updateCourseTask(req, res) {
        try {
            const courseId = req.body.id_course;
            const id = req.body.id;
            const name = req.body.name;
            const description = req.body.description;
            const deadline = req.body.deadline;

            const task = await CourseTaskRepository.getCourseTask(id);
            const course = await CourseRepository.getCourse(courseId);

            if (!task)
                return res.status(400).json({message: "Task not found" });
            if (!course)
                return res.status(400).json({message: "Course not found" });
            
            const courseTask = {
                id_course: courseId,
                id: id,
                name: name,
                description: description,
                deadline: deadline
            }

            const updatedCourseTask = await CourseTaskRepository.updateCourseTask(courseTask);

            if (!updatedCourseTask)
                return res.status(500).json({message: "Failed to update course task"});
            
            res.status(200).json({
                    data: updatedCourseTask,
                    message: 'Task updated successfully'
                });
            
        } catch (error) {
            res.status(500).json({
                message: 'Error updating task',
                error:error
            });
        }
    },

    async getAllTasks(req, res) {
        try{
            const allTasks = await CourseTaskRepository.getAllTasks()
            res.status(200).json(allTasks);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteCourseTask(req, res) {
        try {
            const id = req.params.id;
            await CourseTaskRepository.deleteCourseTask(id);
            res.status(200).json({ message: 'Task deleted successfully from the course' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting task from the course' });
        }
    },

    async getAllTasksByCourseId(req, res) {
        try{
            const course = await CourseRepository.getCourse(req.params.courseId);
            if (!course)
                return res.status(400).json({message: "Course not found" });

            const allTasksByCourseId = await CourseTaskRepository.getAllTasksByCourseId(req.params.courseId)
            res.status(200).json(allTasksByCourseId);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getCourseTask(req, res) {
        try {
            const id = req.params.id;
            const courseTask = await CourseTaskRepository.getCourseTask(id);
            if (!courseTask) {
                res.status(400).json({ message: "Course task not found" });
                return;
            }
            res.json(courseTask);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getNumberofTaskByCourseId(req, res) {
        try {
            const course = await CourseRepository.getCourse(req.params.courseId);
            if (!course)
                return res.status(400).json({message: "Course not found" });

            const count = await CourseTaskRepository.getNumberofTaskByCourseId(req.params.courseId);
            if (!count)
                return res.status(500).json({message: "Failed to fetch number of task by course"});
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching number of task by course', error: error });
        }
    }

};

module.exports = CourseTaskService;