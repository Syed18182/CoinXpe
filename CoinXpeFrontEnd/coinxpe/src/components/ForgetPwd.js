import React, { Component } from "react";
import "./css/Login.css";
import LoginHeader from "./LoginHeader";

export default class ForgetPwd extends Component {
  render() {
    return (
      <div>
        <LoginHeader />
        <div className="row gx-0 justify-content-sm-center">
          <div className="loginbox pt-4">
            <form id="form1">
              <div className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-envelope icon" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div id="appear-otp" className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-lock icon" />
                  </span>
                  <input
                    type="password"
                    id="forgetOtp"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
              <div id="appear-newPwd" className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-key icon" />
                  </span>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter New Password"
                  />
                </div>
              </div>
              <div id="appear-confirmPwd" className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-check icon" />
                  </span>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
              <div className="row gx-0 justify-content-md-center">
                <div className="text-center mt-4">
                  <button
                    id="forgetBtn"
                    className="btn btn-primary btn-lg btn-ex-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      var btn = document.getElementById("forgetBtn");
                      if (btn.innerHTML === "Generate OTP") {
                        document.getElementById("appear-otp").style.display =
                          "block";
                        document.getElementById("appear-otp").style.marginTop =
                          "1rem";
                        btn.innerHTML = "Submit OTP";
                      } else if (btn.innerHTML === "Submit OTP") {
                        document.getElementById("appear-newPwd").style.display =
                          "block";
                        document.getElementById(
                          "appear-newPwd"
                        ).style.marginTop = "1rem";
                        document.getElementById(
                          "appear-confirmPwd"
                        ).style.display = "block";
                        document.getElementById(
                          "appear-confirmPwd"
                        ).style.marginTop = "1rem";
                        btn.innerHTML = "Update Password";
                      }
                    }}
                  >
                    Generate OTP
                  </button>
                </div>
              </div>
              <div className="row gx-0 justify-content-md-center">
                <div className="text-center mt-2">
                  <button
                    className="btn createAccountBtn btn-lg btn-ex-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.changeScreenL(1);
                    }}
                  >
                    Already have an Account?
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
