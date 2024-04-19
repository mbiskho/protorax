import { useState } from "react";
import Swal from "sweetalert2";
import "./styles.css";
import API from '../../constants/api';

const Auth = () => {
  // States
  const [form, setForm] = useState({
    username: "",
    password: "",
    history: "",
  });

  // Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    fetch(`${API.used}/login`, {
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

        const res = await response.json();
        const token = res.token;
        const user = res.user;
        const expirationTime = new Date(
          Date.now() + 2 * 60 * 60 * 1000
        ).toUTCString(); // 2 Hours
        document.cookie = `token=${token}; expires=${expirationTime}`;
        document.cookie = `name=${user.name}; expires=${expirationTime}`;
        document.cookie = `role=${user.role}; expires=${expirationTime}`;

        // get user yang sdh login untuk announcement
        localStorage.setItem('userData', JSON.stringify(user));

        Swal.fire({
          title: "Auth Success",
          text: "Welcome to the system",
          icon: "success",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, [500]);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      });
  };

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
  };

  // UseEffect

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <img
              class="mb-4"
              style={{ width: "180px", margin: "auto" }}
              src="https://cdn.discordapp.com/attachments/1152230774322499634/1230873445105926225/logo-hd-plego-removebg-preview-22x.png?ex=6634e739&is=66227239&hm=9a6b57413788bae79c9b2e7faf7b23c83dfeb204a5de186809425b6b1a195d9f&"
              alt=""
            />
          </div>

          {/* <div style={{display:'flex'}}>
            <h1 class="h3 mb-3 fw-normal mx-auto">User Login</h1>
          </div> */}

          <div class="form-floating">
            <input
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            <label for="floatingInput">Username</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="form-check text-start my-3"></div>
          <button class="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>

          <div style={{ display: "flex" }}>
            <p class="mt-5 mb-3 text-body-secondary mx-auto">
              &copy; Plego 2024
            </p>
          </div>
        </form>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <button>Submit</button>
      </form> */}
    </div>
  );
};

export default Auth;
