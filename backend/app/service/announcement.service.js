const AnnouncementRepository = require("../repository/announcement.repository");
const UserRepository = require("../repository/user.repository");

const AnnouncementService = {
    async listAnnouncement(req, res) {
        try{
            const announcement = await AnnouncementRepository.viewAllAnnouncement()
            res.json(announcement[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async addAnnouncement(req, res) {
        const userId = req.params.id; // Get the id_user from the request body
        const user = await UserRepository.getUser(userId); // Assume a function getUser exists in UserRepository to fetch user details by id

        try {

            if (!user) return res.status(404).json({ message: "User not found" }); // If user does not exist, return 404

            const announcement = {
                id_user: userId,
                title: req.body.title,
                sub_title: req.body.sub_title,
                content: req.body.content,
            }

            const newAnnouncement = await AnnouncementRepository.addAnnouncement(announcement);
            if (!newAnnouncement)
                res.status(500).json({
                    message: "Failed to add announcement"
                });
            res.status(200).json(newAnnouncement);
        } catch (error) {
            res.status(500).send(error);
            // res.status(500).json({message: `Name: '${userId}' couldn't be found `});
        }
    },

    async updateAnnouncement (req, res) {
        const idAnnouncement = req.params.id;
        const idUser = req.params.idUser;
        const id = await AnnouncementRepository.getAnnouncementById(idAnnouncement);
        const cekIdUser = await UserRepository.getUser(idUser);

        try {

            if (!id) return res.status(404).json({ message: "ID not found" });
            if (!cekIdUser) return res.status(404).json({ message: "ID user not found" });

            const announcement = {
                title: req.body.title,
                sub_title: req.body.sub_title,
                content: req.body.content,
            }

            const updateAnnouncement = await AnnouncementRepository.updateAnnouncement(idAnnouncement, idUser, announcement);

            if (!updateAnnouncement)
                res.status(500).json({
                    message: "Failed to add announcement"
                });
            res.status(200).json('Success to update');
        } catch (error) {
            // res.status(500).send(error);
            res.status(500).json({message: `Name: '${idAnnouncement}' couldn't be found `});
        }
    },

    async deleteAnnouncement(req, res) {
        try {
            await AnnouncementRepository.deleteAnnouncement(req.params.id);
            res.status(200).send({ message: 'Announcement deleted successfully' });
        } catch (error) {
          res.status(500).send({ message: 'Error deleting announcement' });
        }
    },

    async pinAnnouncement(req, res) {
        try {
            let id = req.params.id;
            const temp = await AnnouncementRepository.getAnnouncementById(id);
            var is_pinned = null;

            if(temp[0][0].is_pinned == 1) {
                is_pinned = 0;
            } else {
                is_pinned = 1;
            }

            const pin = await AnnouncementRepository.pinAnnouncement(is_pinned, id)
            const temp2 = await AnnouncementRepository.getAnnouncementById(id);
            res.status(200).json(temp2[0][0]);
        } catch (error) {
            res.status(500).send({ message: 'Error pin announcement' });
        }
    },

    async sortAnnouncement(req, res) {
        try {
            let sortBy = req.query.sortBy || "asc"; // Default sorting is ascending (A-Z)
            
            // console.log(sortBy);
            let announcement = await AnnouncementRepository.viewAllAnnouncement();
            let sortResult = null;
            
            if (sortBy === "asc") {
                sortResult = announcement[0].sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === "desc") {
                sortResult = announcement[0].sort((a, b) => b.title.localeCompare(a.title));
            } else {
                return res.status(400).json({ message: "Invalid sortBy parameter. Please use 'asc' or 'desc'." });
            }
    
            res.json(sortResult);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async detailAnnouncement(req, res) {
        try{
            const id = req.params.id;
            const announcement = await AnnouncementRepository.getAnnouncementById(id);
            res.json(announcement[0][0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async searchAnnouncement(req, res) {
        try {

            let keyword = req.query.q; // Ambil kata kunci pencarian dari query string

            if (!keyword) {
                return res.status(400).json({ message: "Keyword parameter is required" });
            }
            ;
            // Panggil method searchAnnouncement dari AnnouncementRepository
            const searchResult = await AnnouncementRepository.searchAnnouncement(keyword);
            res.json(searchResult[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = AnnouncementService;