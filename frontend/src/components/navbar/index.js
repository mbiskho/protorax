import React, { useState, startTransition } from "react";
import { useCookies } from 'react-cookie';
import { PiBellFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

export const Navbar = () => {
  const [cookies, setCookie] = useCookies() || { 'user': 'user' };
  const navigate = useNavigate();

  const navigateAnnouncement = () => {
    startTransition(() => {
      navigate('/announcement');
    });
  };

  function removeCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }


  return (
    <div className="navbar-guru-pelajar">
      <div className="overlap-group">
        <div className="frame">
          <div className="left-item">
            <div className="logo-container">
              <img
                className="logo-HD-plego"
                alt="Logo HD plego"
                src="https://cdn.discordapp.com/attachments/1152230774322499634/1230873445105926225/logo-hd-plego-removebg-preview-22x.png?ex=6634e739&is=66227239&hm=9a6b57413788bae79c9b2e7faf7b23c83dfeb204a5de186809425b6b1a195d9f&"
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
            <a className="text-wrapper" href="/announcement" style={{ fontSize: '22px', color: 'white' }}>
              <PiBellFill />
            </a>
            <div class="dropdown my-auto" style={{ marginRight: "100px" }}>
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: "transparent",
                  borderColor: 'transparent',
                  margin: "none",
                  padding: "none",
                }}
              >
                {cookies.name ? cookies.name : <p>user</p>}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => {
                      removeCookie('token');
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
