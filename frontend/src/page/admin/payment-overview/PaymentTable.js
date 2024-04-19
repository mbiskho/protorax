import React from "react";
import DataTable from "react-data-table-component";
import "./styles.css";

const PaymentTable = ({ student }) => {
  function formatDate(dateString) {
    const optionsDate = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);

    return `${formattedDate}`;
  }

  return (
    <table
      className="payment-table"
      style={{ backgroundColor: "white !important" }}
    >
      <thead style={{ backgroundColor: "#E4E6E8 !important" }}>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
        {student.length > 0 ? (
          student.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.name}</td>
              <td>{payment.course}</td>
              <td>Rp.{payment.price} IDR</td>
              <td>{formatDate(payment.created_at)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PaymentTable;
