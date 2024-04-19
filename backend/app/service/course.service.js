const sharp = require("sharp");
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
                data: courses.map((course) => {
                    return {
                        ...course,
                        photo:
                            course.photo &&
                            `data:image/png;base64,${course.photo}`,
                    };
                }),
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
                data: {
                    ...course,
                    photo:
                        course.photo && `data:image/png;base64,${course.photo}`,
                },
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async createCourse(req, res) {
        try {
            if (req.fileValidationError) {
                res.status(400).json({ message: req.fileValidationError });
                return;
            }

            const course = {
                name: req.body.name,
                id_teacher: req.body.id_teacher,
                rating: req.body.rating,
                description: req.body.description,
                category: req.body.category,
                level: req.body.level,
                price: req.body.price,
                status: req.body.status,
            };

            if (req.file) {
                const buffer = await sharp(req.file.buffer)
                    .resize(640, 480)
                    .jpeg({ quality: 80 })
                    .toBuffer();

                if (buffer.byteLength > 1 * 1024 * 1024) {
                    res.status(400).json({
                        message: "Image size should be less than 1MB",
                    });
                    return;
                }

                course.photo = buffer.toString("base64");
            }

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
            if (req.fileValidationError) {
                res.status(400).json({ message: req.fileValidationError });
                return;
            }

            const id = req.params.id;
            const foundCourse = await CourseRepository.getCourse(id);
            if (!foundCourse) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            const course = {
                id: req.params.id,
                name: req.body.name,
                id_teacher: req.body.id_teacher,
                rating: req.body.rating,
                description: req.body.description,
                category: req.body.category,
                level: req.body.level,
                price: req.body.price,
                status: req.body.status,
            };

            if (req.file) {
                const sharp = require("sharp");
                const buffer = await sharp(req.file.buffer)
                    .resize(640, 480)
                    .jpeg({ quality: 80 })
                    .toBuffer();

                if (buffer.byteLength > 1 * 1024 * 1024) {
                    res.status(400).json({
                        message: "Image size should be less than 1MB",
                    });
                    return;
                }

                course.photo = buffer.toString("base64");
            }

            const updatedCourse = await CourseRepository.updateCourse(course);
            res.json({
                message: "Course updated successfully",
                data: {
                    ...updatedCourse,
                    photo:
                        updatedCourse.photo &&
                        `data:image/png;base64,${updatedCourse.photo}`,
                },
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
    async getTeacher(req, res) {
        try {
            const id = req.params.id;
            const course = await CourseRepository.getCourse(id);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            const id_teacher = course.id_teacher;
            if (!id_teacher) {
                res.status(404).json({
                    message: "Theres no teacher assigned to this course",
                });
                return;
            }

            const teacher = await CourseRepository.getTeacher(id_teacher);
            if (!teacher) {
                res.status(404).json({ message: "Teacher not found" });
                return;
            }

            res.json({
                message: "Teacher found successfully",
                data: teacher,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async removeTeacher(req, res) {
        try {
            const id = req.params.id;
            const course = await CourseRepository.getCourse(id);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            const id_teacher = course.id_teacher;
            if (!id_teacher) {
                res.status(404).json({
                    message: "Theres no teacher assigned to this course",
                });
                return;
            }

            await CourseRepository.removeTeacher(id);
            res.json({
                message: "Teacher removed from course successfully",
                data: await CourseRepository.getCourse(id),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

module.exports = CourseService;
