const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const AnnouncementRepository = {
    async addAnnouncement(announcement) {

        let created = null;
        created = await db.query("INSERT INTO announcement (id_user, title, sub_title, content) VALUES (?, ?, ?, ?)", [announcement.id_user, announcement.title, announcement.sub_title, announcement.content]);

        return announcement;
    },

    async viewAllAnnouncement() {
        return await db.query("SELECT a.title as title, a.sub_title as sub_title, a.content as content, a.created_at as created_at, a.updated_at as updated_at from announcement as a JOIN user as u ON a.id_user = u.id")
        // return all;
    },

    async getAnnouncementById(id) {
        return await db.query("SELECT * FROM announcement WHERE id = ?", [id])
    },

    async updateAnnouncement(id, announcement) {
        let update = await db.query("UPDATE announcement SET title = ?, sub_title = ?, content = ? WHERE id = ?", [announcement.title, announcement.sub_title, announcement.content, id]);
        return update;
    },

    async deleteAnnouncement(id) {
        return await db.query("DELETE FROM announcement WHERE id = ?", [id]);
    },

    async pinAnnouncement(is_pinned, id) {
        return await db.query("UPDATE announcement SET is_pinned = ? WHERE id = ?", [is_pinned, id])
    }
};

module.exports = AnnouncementRepository;