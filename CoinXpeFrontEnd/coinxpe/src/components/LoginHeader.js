import React, { Component } from "react";
import "./css/Login.css";

export default class LoginHeader extends Component {
  render() {
    return (
      <div>
        <div className="row gx-0 justify-content-md-center">
          <img
            className="col-auto"
            src={require("./Images/signupHeader.png")}
            height={300}
            alt="SignUpHeader"
          />
        </div>
        <div className="row gx-0 my-2 justify-content-center">
          <img
            className="col-auto"
            src={require("./logo/logo.png")}
            height={50}
            width={50}
            alt={this.props.cloudResource}
          />
          <div className="col-auto d-flex aligns-items-center pt-2 px-2 logo">
            CoinXpe
          </div>
        </div>
      </div>
    );
  }
}
