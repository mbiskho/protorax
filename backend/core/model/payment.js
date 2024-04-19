// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      name: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(10, 2),
      creationDate: DataTypes.DATE
    });
  
    return Payment;
  };
  