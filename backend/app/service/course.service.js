const CourseRepository = require("../repository/course.repository");

const CourseService = {
    async listCourses(req, res) {
        try {
            const courses = await CourseRepository.getAllCourse();
            if (courses.length === 0) {
                res.status(404).json({ message: "No courses found" });
                return;
            }
            res.json({
                message: "Courses found successfully",
                data: courses,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getCourse(req, res) {
        try {
            const id = req.params.id;
            const course = await CourseRepository.getCourse(id);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }
            res.json({
                message: "Course found successfully",
                data: course,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async createCourse(req, res) {
        try {
            const course = {
                name: req.body.name,
                id_teacher: req.body.id_teacher,
                rating: req.body.rating,
                description: req.body.description,
                photo: req.body.photo,
                category: req.body.category,
                level: req.body.level,
                price: req.body.price,
                status: req.body.status,
            };
            const createdCourse = await CourseRepository.createCourse(course);
            res.json({
                message: "Course created successfully",
                data: createdCourse,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async updateCourse(req, res) {
        try {
            const id = req.params.id;
            const findCourse = await CourseRepository.getCourse(id);
            if (!findCourse) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            const course = {
                id: req.params.id,
                name: req.body.name,
                id_teacher: req.body.id_teacher,
                rating: req.body.rating,
                description: req.body.description,
                photo: req.body.photo,
                category: req.body.category,
                level: req.body.level,
                price: req.body.price,
                status: req.body.status,
            };
            const updatedCourse = await CourseRepository.updateCourse(course);
            res.json({
                message: "Course updated successfully",
                data: updatedCourse,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async deleteCourse(req, res) {
        try {
            const id = req.params.id;
            const findCourse = await CourseRepository.getCourse(id);
            if (!findCourse) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            await CourseRepository.deleteCourse(id);
            res.json({
                message: "Course deleted successfully",
                data: findCourse,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

module.exports = CourseService;
