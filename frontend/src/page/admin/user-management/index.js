import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../constants/api";
import "./styles.css";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Navbar from "../../../components/navbar/Navbar";

const UserManagement = () => {
  /**
   * States
   */
  const Swal = require("sweetalert2");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Sekolah",
      selector: (row) => row.school_name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-container">
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={() => {
              deleteUser(row.id);
            }}
          >
            Delete
          </button>
          <button type="button" class="btn btn-outline-warning" onClick={()=>{window.location.assign(`/users/${row.id}/update`)}}>
            Edit
          </button>
        </div>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16.7px",
        fontWeight: "600",
        backgroundColor: "#fafafa",
      },
    },

    cells: {
      style: {
        backgroundColor: "#fafafa",
        fontSize: "16.7px",
        color: "#4b5563",
      },
    },
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Functions
   */
  const fetchUsers = async () => {
    try{
      const response = await axios.get(`${API.used}/user`);
      setUsers(response.data);
      setLoading(false);
    }catch{
      setLoading(false);
    }

  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdate(true);
        fetch(`${API.used}/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as required
          },
          body: JSON.stringify({
            // Data to be sent if required
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            const filter = users.filter((obj) => obj.id !== id);
            setUsers(filter);
            setUpdate(false);
          })
          .catch((error) => {
            Swal.fire({
              title: "Failed!",
              text: "User not deleted",
              icon: "error",
            });
            setUpdate(false);
          });
      }
    });
    // await axios.delete(`/api/users/${id}`);
    // fetchUsers();
  };

  return (
    <div className="wrap">
      <div className="wrapper">
        <div className="upper">
          <div style={{ display: "flex", gap: "6px" }}>
            <p>Daftar Pengguna</p>
            {update ? (
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              window.location.assign("/users/add");
            }}
          >
            + Add User
          </button>
        </div>

        <div className="list-user">
          <DataTable
            columns={columns}
            data={users}
            customStyles={customStyles}
            pagination
            progressPending={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
