import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import API from "../../../constants/api";
import SearchBar from "./SearchBar";
import Accordion from "./Accordion";

const PaymentOverview = () => {
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("ascending");

  const [searchResults, setSearchResults] = useState([]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let objectToSort = searchResults;
    if (searchTerm === "") {
      objectToSort = payments;
    }

    const results = objectToSort.map((ctx) => {
      let filteredStudents = sortStudents(ctx.students);
      return {
        ...ctx,
        students: filteredStudents,
      };
    });
    setSearchResults(results);
  };
  const sortStudents = (students) => {
    if (sortOption === "descending") {
      return students.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    return students.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = payments.map((ctx) => {
      let filteredStudents = ctx.students.filter((student) => {
        const byName = student.name
          .toLowerCase()
          .includes(event.target.value?.toLowerCase());

        const byPrice = student.price === parseInt(event.target.value, 10);
        const byCourseName = student.course
          .toLowerCase()
          .includes(event.target.value?.toLowerCase());

        return byCourseName || byPrice || byName;
      });

      console.log(filteredStudents);

      filteredStudents = sortStudents(filteredStudents);
      return {
        ...ctx,
        students: filteredStudents,
      };
    });
    setSearchResults(results);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API.used}/payment`);
      console.log(response.data);
      const total = response.data.total;
      const payment = response.data.datas;
      const results = payment.map((ctx) => {
        let filteredStudents = sortStudents(ctx.students);
        return {
          ...ctx,
          students: filteredStudents,
        };
      });
      setTotal(total);
      setPayments(results);
      setFiltered(payment);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filt = payments.filter((payment) => {
      let condition = false;
      const students = payment.students;

      students.forEach((std) => {
        const actualResult =
          std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.school_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          std.course.toLowerCase().includes(searchTerm.toLowerCase());
        condition = condition || actualResult;
      });
      return condition;
    });
    setFiltered(filt);
  }, [searchTerm]);

  return (
    <div>
      <div className="container">
        <div className="row justify-content-between mt-3">
          <h4 className="col m-2">
            <b>Payments Overview</b>
          </h4>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select"
              onChange={handleSortChange}
              style={{
                width: 120,
              }}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
            <div className="col-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
        <Accordion
          data={sortStudents(filtered)}
          searchResults={searchResults}
          searchTerm={searchTerm}
        />
        <div>
          <b>Total: ${total.toFixed(2)} USD</b>{" "}
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
