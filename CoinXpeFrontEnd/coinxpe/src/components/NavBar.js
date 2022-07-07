import React, { useEffect } from "react";
import "./css/NavBar.css";

function NavBar(props) {
  const showNavbar = () => {
    const toggle = document.getElementById("header-toggle"),
      nav = document.getElementById("nav-bar"),
      bodypd = document.getElementById("body-pd"),
      headerpd = document.getElementById("header");
    nav.classList.toggle("show");
    toggle.classList.toggle("bx-x");
    bodypd.classList.toggle("body-pd");
    headerpd.classList.toggle("body-pd");
    if (props.value === 0) {
      props.updateToggle(1);
    } else {
      props.updateToggle(0);
    }
  };

  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav_link");
    linkColor.forEach((l) =>
      l.addEventListener("click", () => {
        linkColor.forEach((l) => l.classList.remove("active"));
        l.classList.add("active");
      })
    );
  });

  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle" onClick={showNavbar}>
          <i className="bx bx-menu" id="header-toggle" />
        </div>
        <div className="form-outline topPadder px-4">
          <div className="input-group">
            <form className="formSearch1">
              <input
                type="search"
                placeholder="Search here ..."
                className="inputSearch"
                onChange={async (e) => {
                  var searchedData = [];
                  var k = 0;
                  props.data.map((oneData, key) => {
                    if (oneData.email.match(e.target.value) !== null) {
                      searchedData[k] = props.data[key];
                      k++;
                    }
                    return 0;
                  });
                  props.updateData(searchedData);
                }}
              />
              <i className="fa fa-search faSearch" />
            </form>
          </div>
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <div className="nav_logo">
              <img
                src={require("./logo/logo.png")}
                width={25}
                height={25}
                className="nav_icon"
                alt={"BannerImg"}
              />
              <span className="nav_logo-name">CoinXpe</span>
            </div>
            <div className="nav_list">
              <div
                className="nav_link active"
                onClick={() => {
                  props.changeScreen(1);
                }}
              >
                <i className="bx bx-user nav_icon" />
                <span className="nav_name">View Users</span>
              </div>
              <div
                className="nav_link"
                onClick={() => {
                  props.changeScreen(2);
                }}
              >
                <i className="fas fa-clipboard-list nav_icon" />
                <span className="nav_name">Update Users</span>
              </div>
              <div
                className="nav_link"
                onClick={() => {
                  props.changeScreen(3);
                }}
              >
                <i className="bx bx-trash nav_icon" />
                <span className="nav_name">Delete Users</span>
              </div>
              <div
                className="nav_link"
                onClick={() => {
                  props.changeScreen(4);
                }}
              >
                <i className="fa fa-refresh nav_icon" />
                <span className="nav_name">Restore Users</span>
              </div>
            </div>
          </div>
          <div className="nav_link">
            <i className="bx bx-log-out nav_icon" />
            <span className="nav_name">SignOut</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
