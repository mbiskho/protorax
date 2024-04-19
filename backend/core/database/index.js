const mysql = require("mysql2/promise");

const config = {
    host: "89.116.157.90",
    user: "root",
    password: "indonesialebihbaik",
    database: "master",
    waitForConnections: true,
};

const database = {
    async query(query, args) {
        let res = 1;
        try {
            const pool = mysql.createPool(config);
            res = await pool.query(query, args);
            await pool.end();
        } catch (error) {
            console.error(error);
            return null;
        }
        return res;
    },
};

module.exports = database;
