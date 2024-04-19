const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const AnnouncementRepository = {
    async addAnnouncement(announcement) {

        let created = null;
        created = await db.query(
            "INSERT INTO announcement (id_user, title, sub_title, content) VALUES (?, ?, ?, ?)", 
            [announcement.id_user, announcement.title, announcement.sub_title, announcement.content]
        );

        return announcement;
    },

    async viewAllAnnouncement() {
        const searchQuery = `
            SELECT 
                a.id, a.id_user, 
                a.title as title, 
                a.sub_title as sub_title, 
                a.content as content, 
                a.is_pinned, 
                a.created_at as created_at, 
                a.updated_at as updated_at
            FROM announcement as a 
            JOIN user as u 
            ON a.id_user = u.id 
            ORDER BY a.created_at DESC
        `;
        return await db.query(searchQuery)
    },

    async getAnnouncementById(id) {
        return await db.query("SELECT * FROM announcement WHERE id = ?", [id])
    },

    async updateAnnouncement(id, id_user, announcement) {
        let update = await db.query(
            "UPDATE announcement SET title = ?, sub_title = ?, content = ? WHERE id = ? AND id_user = ?", 
            [announcement.title, announcement.sub_title, announcement.content, id, id_user]
        );
        return update;
    },

    async deleteAnnouncement(id) {
        return await db.query("DELETE FROM announcement WHERE id = ?", [id]);
    },

    async pinAnnouncement(is_pinned, id) {
        
        // kondisi jika ingin melakukan pin pada announcement lain
        if(is_pinned == 1) {
            await db.query("UPDATE announcement SET is_pinned = 0 WHERE id != ?", [id]);
        }

        return await db.query("UPDATE announcement SET is_pinned = ? WHERE id = ?", [is_pinned, id])
    },

    async searchAnnouncement(keyword) {
        const searchQuery = `
            SELECT *
            FROM announcement
            WHERE title LIKE ? OR sub_title LIKE ?
        `;

        const searchKeyword = `%${keyword}%`;

        const searchResult = await db.query(searchQuery, [searchKeyword, searchKeyword]);
        return searchResult;
    }
};

module.exports = AnnouncementRepository;