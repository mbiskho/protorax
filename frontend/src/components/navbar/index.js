import React from "react";
import "./style.css";

export const Navbar = () => {
  return (
    <div className="navbar-guru-pelajar">
      <div className="overlap-group">
        <div className="frame">
          <div className="left-item">
            <div className="logo-container">
              <img
                className="logo-HD-plego"
                alt="Logo HD plego"
                src="https://cdn.discordapp.com/attachments/1213443100265938944/1213443228590673920/logo-hd-plego-removebg-preview-22x.png?ex=65f57e12&is=65e30912&hm=2a82d6820aad7c5a36a1f1ea14d4d326003026b8b77789002d37275c92b5cad3&"
              />
            </div>
            <div className="navbar-item">
              <div className="div">
                <a className="text-wrapper" href="/">
                  Home
                </a>
                <a className="text-wrapper" href="/course">
                  Course
                </a>
                <a className="text-wrapper" href="/absensi">
                  Absensi
                </a>
                <a className="text-wrapper" href="/user-management">
                  User Management
                </a>
              </div>
            </div>
          </div>

          <div className="right-item">
            <div class="dropdown my-auto" style={{ marginRight: "100px" }}>
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: "transparent",
                  margin: "none",
                  padding: "none",
                }}
              >
                User
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.assign('/auth')
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
