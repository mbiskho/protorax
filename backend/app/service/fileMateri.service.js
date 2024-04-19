// const TaskSubmissionRepository = require("../repository/taskSubmission.repository");
const FileMateriRepository = require("../repository/fileMateri.repository");
const CourseRepository = require("../repository/course.repository");
// const MateriRepository = require("../repository/materi.repository");
const MateriRepository = require("../repository/materi.repository");
const UserRepository = require("../repository/user.repository");

const FileMateriService = {

    async getLastId(req, res) {
        try {
            const lastId = await FileMateriRepository.getLastId();
            if (lastId === null)
                return res.status(500).json({ message: "Failed to fetch last id" });
            res.status(200).json({ lastId: lastId });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching last id', error: error });
        }
    },

    async addFileMateri(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send('No files were uploaded.');
            }

            if (req.file.size > 10 * 1024 * 1024) { // 10 MB dalam byte
                return res.status(400).json({ message: 'File terlalu besar. Maksimum 10 MB diizinkan.' });
            }

            const materi = await MateriRepository.getMateri(req.body.id_course_materi);
            if (!materi)
                return res.status(400).json({ message: "Materi not found" });

            const fileMateri = {
                id_course_materi: req.body.id_course_materi,
                file: req.file.buffer,
                name: req.file.originalname,
            }

            const addedFileMateri = await FileMateriRepository.addFileMateri(fileMateri);

            if (addedFileMateri === null)
                return res.status(500).json({ message: "Failed to add fileMateri" });

            res.status(200).json({
                data: addedFileMateri,
                message: 'File materi added successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error adding file materi',
                error: error
            });
        }
    },

    async updateFileMateri(req, res) {
        try {
            const fileMateri = await FileMateriRepository.getFileMateri(req.body.id);
            const materi = await MateriRepository.getMateri(req.body.id_course_materi);

            if (!fileMateri)
                return res.status(400).json({ message: "File materi not found" });
            if (!materi)
                return res.status(400).json({ message: "Materi not found" });
            if (!req.file) {
                return res.status(400).send('No files were uploaded.');
            }
            if (req.file.size > 10 * 1024 * 1024) { // 10 MB dalam byte
                return res.status(400).json({ message: 'File terlalu besar. Maksimum 10 MB diizinkan.' });
            }

            const newFileMateri = {
                id: req.body.id,
                id_course_materi: req.body.id_course_materi,
                file: req.file.buffer,
                name: req.file.originalname,
            }

            const updatedFileMateri = await FileMateriRepository.updateFileMateri(newFileMateri);

            if (!updatedFileMateri)
                return res.status(500).json({ message: "Failed to update file materi" });

            res.status(200).json({
                data: updatedFileMateri,
                message: 'File materi updated successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error updating file materi',
                error: error
            });
        }
    },

    async getAllFileMateri(req, res) {
        try {
            const allFileMateri = await FileMateriRepository.getAllFileMateri()
            res.status(200).json(allFileMateri);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async deleteFileMateri(req, res) {
        try {
            const id = req.params.id;
            await FileMateriRepository.deleteFileMateri(id);
            res.status(200).json({ message: 'File materi deleted successfully from the course' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting file materi from the course' });
        }
    },

    async getAllFileByMateriId(req, res) {
        try {
            const materi = await MateriRepository.getMateri(req.params.materiId);
            if (!materi)
                return res.status(400).json({ message: "Materi not found" });

            const allFilesByMateri = await FileMateriRepository.getAllFileByMateri(req.params.materiId);
            res.status(200).json(allFilesByMateri);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getFileMateri(req, res) {
        try {
            const id = req.params.id;
            const fileMateri = await FileMateriRepository.getFileMateri(id);
            if (!fileMateri) {
                res.status(404).json({ message: "File materi not found" });
                return;
            }
            res.json(fileMateri);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getNumberofFileByMateriId(req, res) {
        try {
            const materi = await MateriRepository.getMateri(req.params.materiId);
            if (!materi)
                return res.status(400).json({ message: "Materi not found" });

            const count = await FileMateriRepository.getNumberofFileByMateri(req.params.materiId);
            if (!count)
                return res.status(500).json({ message: "Failed to fetch number of files by materi" });
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching number of files by materi', error: error });
        }
    },

    async downloadFileMateri(req, res) {
        try {
            const id = req.params.id;
            const fileMateri = await FileMateriRepository.downloadFileMateri(id);
            if (!fileMateri) {
                res.status(404).json({ message: "File materi not found" });
                return;
            }
            res.setHeader('Content-Disposition', 'attachment; filename=' + fileMateri.name);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(fileMateri.file);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // async getSubmissionByUser(req, res) {
    //     try {
    //         const user = await UserRepository.getUser(req.params.userId);
    //         if (user.length === 0 || !user)
    //             return res.status(400).json({message: "User not found" });

    //         const id = req.params.id;
    //         const fileMateri = await FileMateriRepository.getSubmissionByUser(req.params.userId);
    //         if (!fileMateri) {
    //             res.status(404).json({ message: "Submission not found" });
    //             return;
    //         }
    //         res.json(fileMateri);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // },

    // async getSubmissionByUserAndMateri(req, res) {
    //     try {
    //         const materiId = req.params.materiId;
    //         const materi = await MateriRepository.getMateri(materiId);
    //         if (!materi)
    //             return res.status(400).json({message: "Materi not found" });

    //         const userId = req.params.userId;
    //         const user = await UserRepository.getUser(userId);
    //         if (user.length === 0 || !user)
    //             return res.status(400).json({message: "User not found" });

    //         const fileMateri = await FileMateriRepository.getSubmissionByUserAndMateri(materiId, userId);
    //         if (!fileMateri) {
    //             res.status(404).json({ message: "Submission not found" });
    //             return;
    //         }
    //         res.json(fileMateri);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // },

};

module.exports = FileMateriService;