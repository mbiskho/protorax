const PaymentRepository = require("../repository/payment.repository");

function groupBySchool(data) {
  let totalAll = 0;
  const grouped = data.reduce((accumulator, currentValue) => {
    const { school, price } = currentValue;
    totalAll += price;
    let group = accumulator.find((item) => item.school_name === school);
    if (!group) {
      group = { school_name: school, price: 0, students: [] };
      accumulator.push(group);
    }
    group.price += price;
    group.students.push(currentValue);
    return accumulator;
  }, []);

  return {
    total: totalAll,
    datas: grouped,
  };
}

const PaymentService = {
  async getStudentToPayment(req, res) {
    const students = await PaymentRepository.getListStudentPayment();
    const groupedData = groupBySchool(students);
    console.log(students);
    res.status(200).send(groupedData);
  },
};
module.exports = PaymentService;
