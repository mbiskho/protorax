const db = require("../../core/database");

const PaymentRepository = {
 async getListStudentPayment() {
    var all = [];
    let [user_school] = await db.query(
      `
      SELECT u.name as name , s.name as school, c.name as course, c.price as price, c.created_at as created_at from user u 
      JOIN school s on s.id = u.id_school 
      JOIN course_student cs on cs.id_user = u.id
      JOIN course c on c.id = cs.id_course
    `
    );
    all = all.concat(user_school);
    let [user_noschool] = await db.query(
      `
      SELECT u.name as name, 'No-Group' as school, c.name as course, c.price as price, c.created_at as created_at  from user u 
      JOIN course_student cs on cs.id_user = u.id
      JOIN course c on c.id = cs.id_course where u.id_school is NULL; 
      `
    );
    all = all.concat(user_noschool);
    return all;
  }
};

module.exports = PaymentRepository;

