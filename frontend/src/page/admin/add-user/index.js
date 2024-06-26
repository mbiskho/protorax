import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import Swal from "sweetalert2";
import Navbar from "../../../components/navbar/Navbar";
import API from "../../../constants/api";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    role: "",
    gender: "",
    school: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      //  TODO : pake regrex untuk validasi 8 karakter ada uppercase min 1 
      const payload = {
        username: form.username,
        password: form.password,
        name: form.name,
        role: form.role,
        gender: form.gender,
        id_school: form.school,
      };

      fetch(`${API.used}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }

          Swal.fire({
            title: "Successfull",
            text: "User has been created",
            icon: "success",
            timer: 1500
          });

          setTimeout(() => {
            window.location.assign("/users");
          }, [1500]);
        })
        .catch((error) => {
          setLoading(false)
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });
        });
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <h2 style={{ fontWeight: "600" }}>Add User</h2>
          </div>
          <div className="form-group">
            <div class="form-floating">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                style={{ width: "250px" }}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
              />
              <label for="floatingInput">Username *</label>
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                style={{ width: "250px" }}
                required
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <label for="floatingInput">Password *</label>
            </div>
          </div>

          <div className="form-group">
            <div class="form-floating">
              <select
                class="form-select"
                style={{ width: "250px" }}
                aria-label="Default select example"
                required
                onChange={(e) => {
                  setForm({ ...form, gender: e.target.value });
                }}
              >
                <option selected>Open this select menu</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <label for="floatingInput">Gender *</label>
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                style={{ width: "250px" }}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <label for="floatingInput">Name *</label>
            </div>
          </div>

          <div className="form-group">
            <div class="form-floating">
              <select
                class="form-select"
                style={{ width: "250px" }}
                aria-label="Default select example"
                required
                onChange={(e) => {
                  setForm({ ...form, role: e.target.value });
                }}
              >
                <option selected value="madministratif">
                  Manajemen Administratif
                </option>
                <option value="mkurikulum">Manajemen Kurikulum</option>
                <option value="msekolah">Manajemen Sekolah</option>
                <option value="pelajar">Pelajar</option>
                <option value="guru">Guru</option>
              </select>
              <label for="floatingInput">Role *</label>
            </div>
            <div class="form-floating">
              <select
                class="form-select"
                style={{ width: "250px" }}
                aria-label="Default select example"
                required
                onChange={(e) => {
                  setForm({ ...form, school: e.target.value });
                }}
              >
                <option selected value={null}>
                  Click to select
                </option>
                <option value="TK-ABC">SD TADIKA MESRA</option>
              </select>
              <label for="floatingInput">School</label>
            </div>
          </div>
          <div className="form-group">
            {loading ? (
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
