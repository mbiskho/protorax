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
        const user = await UserRepository.getUserById(userId); // Assume a function getUserById exists in UserRepository to fetch user details by id

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
        const id = await AnnouncementRepository.getAnnouncementById(idAnnouncement);

        try {

            if (!id) return res.status(404).json({ message: "ID not found" });

            const announcement = {
                title: req.body.title,
                sub_title: req.body.sub_title,
                content: req.body.content,
            }

            const updateAnnouncement = await AnnouncementRepository.updateAnnouncement(idAnnouncement, announcement);

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
            res.status(200).send({ message: 'Announcement pin successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error pin announcement' });
        }
    }
};

module.exports = AnnouncementService;