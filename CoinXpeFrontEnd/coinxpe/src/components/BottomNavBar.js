import React, { Component } from "react";
import "./css/BottomNavBar.css";

export default class BottomNavBar extends Component {
  render() {
    return (
      <div className="row gx-0 justify-content-center fixed-bottom">
        <nav className="navbar">
          <i
            className="fa fa-home bnbicons bnbactiveicons"
            id="home"
            onClick={() => {
              this.props.changeScreenD(1);
              document.getElementById("home").classList.add("bnbactiveicons");
              document
                .getElementById("market")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("wallet")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("news")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("setting")
                .classList.remove("bnbactiveicons");
            }}
          />
          <i
            className="fa fa-university bnbicons"
            id="market"
            onClick={() => {
              this.props.changeScreenD(2);
              document
                .getElementById("home")
                .classList.remove("bnbactiveicons");
              document.getElementById("market").classList.add("bnbactiveicons");
              document
                .getElementById("wallet")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("news")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("setting")
                .classList.remove("bnbactiveicons");
            }}
          />
          <i
            className="fa fa-briefcase bnbicons"
            id="wallet"
            onClick={() => {
              this.props.changeScreenD(3);
              document
                .getElementById("home")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("market")
                .classList.remove("bnbactiveicons");
              document.getElementById("wallet").classList.add("bnbactiveicons");
              document
                .getElementById("news")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("setting")
                .classList.remove("bnbactiveicons");
            }}
          />
          <i
            className="fas fa-paste bnbicons"
            id="news"
            onClick={() => {
              this.props.changeScreenD(4);
              document
                .getElementById("home")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("market")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("wallet")
                .classList.remove("bnbactiveicons");
              document.getElementById("news").classList.add("bnbactiveicons");
              document
                .getElementById("setting")
                .classList.remove("bnbactiveicons");
            }}
          />
          <i
            className="fa fa-cog bnbicons"
            id="setting"
            onClick={() => {
              this.props.changeScreenD(5);
              document
                .getElementById("home")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("market")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("wallet")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("news")
                .classList.remove("bnbactiveicons");
              document
                .getElementById("setting")
                .classList.add("bnbactiveicons");
            }}
          />
        </nav>
      </div>
    );
  }
}
