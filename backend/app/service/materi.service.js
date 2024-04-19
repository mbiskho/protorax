const MateriRepository = require("../repository/materi.repository");
const CourseRepository = require("../repository/course.repository");

const MateriService = {

    async getLastId(req, res) {
        try {
            const lastId = await MateriRepository.getLastId();
            if (lastId === null)
                return res.status(500).json({ message: "Failed to fetch last id" });
            res.status(200).json({ lastId: lastId });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching last id', error: error });
        }
    },

    async addMateri(req, res) {
        try {
            const courseId = req.body.id_course;
            const name = req.body.name;

            const course = await CourseRepository.getCourse(courseId);

            if (!course)
                return res.status(400).json({ message: "Course not found" });

            const materi = {
                id_course: courseId,
                name: name,
            }

            const addedMateri = await MateriRepository.addMateri(materi);

            if (addedMateri === null)
                return res.status(500).json({ message: "Failed to add chapter" });

            res.status(200).json({
                data: addedMateri,
                message: 'Chapter added successfully to the course'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error adding chapter to the course',
                error: error
            });
        }
    },

    async updateMateri(req, res) {
        try {
            const id = req.body.id;
            const courseId = req.body.id_course;
            const name = req.body.name;

            const existedMateri = await MateriRepository.getMateri(id);
            const course = await CourseRepository.getCourse(courseId);

            if (!existedMateri)
                return res.status(400).json({ message: "Chapter not found" });
            if (!course)
                return res.status(400).json({ message: "Course not found" });

            const materi = {
                id_course: courseId,
                id: id,
                name: name,
            }

            const updatedMateri = await MateriRepository.updateMateri(materi);

            if (!updatedMateri)
                return res.status(500).json({ message: "Failed to update chapter" });

            res.status(200).json({
                data: updatedMateri,
                message: 'Chapter updated successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error updating chapter',
                error: error
            });
        }
    },

    async getAllMateri(req, res) {
        try {
            const allMateri = await MateriRepository.getAllMateri()
            res.status(200).json(allMateri);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteMateri(req, res) {
        try {
            const id = req.params.id;
            await MateriRepository.deleteMateri(id);
            res.status(200).json({ message: 'Chapter deleted successfully from the course' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting chapter from the course' });
        }
    },

    async getAllMateriByCourseId(req, res) {
        try {
            const course = await CourseRepository.getCourse(req.params.courseId);
            if (!course)
                return res.status(400).json({ message: "Course not found" });

            const allMateriByCourseId = await MateriRepository.getAllMateriByCourseId(req.params.courseId)
            res.status(200).json(allMateriByCourseId);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getMateri(req, res) {
        try {
            const id = req.params.id;
            const materi = await MateriRepository.getMateri(id);
            if (!materi) {
                res.status(400).json({ message: "Chapter not found" });
                return;
            }
            res.json(materi);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getNumberofMateriByCourseId(req, res) {
        try {
            const course = await CourseRepository.getCourse(req.params.courseId);
            if (!course)
                return res.status(400).json({ message: "Course not found" });

            const count = await MateriRepository.getNumberofMateriByCourseId(req.params.courseId);
            if (!count)
                return res.status(500).json({ message: "Failed to fetch number of chapter by course" });
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching number of materi by course', error: error });
        }
    }

};

module.exports = MateriService;