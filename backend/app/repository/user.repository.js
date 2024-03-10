const db = require("../../core/database");
const { v4: uuidv4 } = require("uuid");

const UserRepository = {
  async autenticate(username) {
    const [rows] = await db.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },
  async getAllUser() {
    var all = [];
    let [user_school] = await db.query(
      "SELECT u.id as id, u.id as school_id, s.name as school_name, u.name, u.username, u.role, u.gender  from user as u JOIN school as s WHERE u.id_school = s.id"
    );
    all = all.concat(user_school);
    let [user_noschool] = await db.query(
      "SELECT u.id, u.name, u.username, u.role, u.gender, null as id_school, 'NO-GROUP' as school_name from user as u WHERE u.id_school is NULL"
    );
    all = all.concat(user_noschool);
    // console.log(all)
    return all;
  },
  async getUser(id) {
    let [row] = await db.query(
      "SELECT u.id as id, u.id as school_id, s.name as school_name, u.password as password, u.name, u.username, u.role, u.gender  from user as u JOIN school as s WHERE u.id = ?",
      [id]
    );
    return row;
  },
  async createUser(user) {
    const id = uuidv4();
    let created = null;
    if (!user.id_school) {
      created = await db.query(
        "INSERT into user (id, username, password, name, role, gender) values (?, ?, ?, ?, ?, ?)",
        [id, user.username, user.password, user.name, user.role, user.gender]
      );
    } else {
      created = await db.query(
        "INSERT into user (id, username, password, name, role, gender, id_school) values (?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          user.username,
          user.password,
          user.name,
          user.role,
          user.gender,
          user.id_school,
        ]
      );
    }
    if (!created) return null;
    return user;
  },
  async deleteUser(id) {
    return await db.query("DELETE FROM user WHERE id = ?", [id]);
  },

  async updateUser(id, user) {
    const { ...rest } = user;
    let valuesIn = [];
    let updateFields = [];

    const keys = Object.keys(rest);
    const values = keys.map((key) => rest[key]);

    keys.forEach((key) => {
      try {
        if (rest[key]) {
          updateFields.push(`${key} = ?`);
          valuesIn.push(rest[key]);
        } else {
          if(key === 'id_school'){
            updateFields.push(`id_school = ?`);
            valuesIn.push(null);
          }
          // Continue
        }
      } catch (e) {
        print(e);
      }
    });
    // print(values)
    console.log(updateFields)
    console.log(valuesIn)
    updateFields = updateFields.join(", ");
    valuesIn.push(id);
    const [result] = await db.query(
      `UPDATE user SET ${updateFields} WHERE id = ?`,
      valuesIn
    );
    return 1;
  },
};

module.exports = UserRepository;
