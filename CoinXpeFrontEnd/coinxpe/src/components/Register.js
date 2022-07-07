import React, { Component } from "react";
import "./css/Login.css";
import axios from "axios";
import LoginHeader from "./LoginHeader";
import ModalConfirmation from "./ModalConfirmation";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      email: "",
      password: "",
      aadhar: "",
      pan: "",
      confirmPwd: "",
      otp: 0,
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <ModalConfirmation
          message={"Registration Seccessful"}
          show={this.state.show}
          handleClose={this.hideModal}
        />
        <LoginHeader />
        <div className="row gx-0 justify-content-sm-center">
          <div className="loginbox pt-4">
            <form
              id="form1"
              className="needs-validation"
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                var btn = document.getElementById("registrationBtn");
                var form = document.getElementById("form1");
                if (!form.checkValidity()) {
                  e.stopPropagation();
                } else {
                  if (btn.innerHTML === "Generate OTP") {
                    axios
                      .get(
                        "http://localhost:8000/generateOtpRegister/" +
                          this.state.email
                      )
                      .then((res) => {})
                      .catch((e) => {});
                    document.getElementById("appear-on-click").style.display =
                      "block";
                    document.getElementById(
                      "validationCustom01"
                    ).disabled = true;
                    document.getElementById(
                      "validationCustom02"
                    ).disabled = true;
                    document.getElementById(
                      "validationCustom03"
                    ).disabled = true;
                    document.getElementById(
                      "validationCustom04"
                    ).disabled = true;
                    document.getElementById(
                      "validationCustom05"
                    ).disabled = true;
                    document.getElementById(
                      "validationCustom06"
                    ).disabled = true;
                    document.getElementById("appear-on-click").style.marginTop =
                      "1rem";
                    btn.innerHTML = "Register";
                  } else {
                    this.showModal();
                    axios
                      .post("http://localhost:8000/registerNewUser", {
                        email: this.state.email,
                        username: this.state.uname,
                        password: this.state.password,
                        otp: this.state.otp,
                        aadhar: this.state.aadhar,
                        pan: this.state.pan,
                      })
                      .then((res) => {})
                      .catch((e) => {});
                  }
                }
                form.classList.add("was-validated");
              }}
            >
              <div className="form-outline mb-3 px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-envelope icon" />
                  </span>
                  <input
                    type="text"
                    id="validationCustom01"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter Username"
                    onChange={(e) => this.setState({ uname: e.target.value })}
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">
                    Please enter a username.
                  </div>
                </div>
              </div>
              <div className="form-outline mb-3 px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-envelope icon" />
                  </span>
                  <input
                    type="email"
                    id="validationCustom02"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Email Address"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">Please enter an email.</div>
                </div>
              </div>
              <div className="form-outline mb-3 px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-id-card icon" />
                  </span>
                  <input
                    type="tel"
                    id="validationCustom03"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Aadhar"
                    maxLength="12"
                    minLength="12"
                    onChange={(e) => this.setState({ aadhar: e.target.value })}
                    required
                    pattern="[0-9]{12}"
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">
                    Aadhar number must be of 12 digits.
                  </div>
                </div>
              </div>
              <div className="form-outline mb-3 px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-credit-card icon" />
                  </span>
                  <input
                    type="text"
                    id="validationCustom04"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="PAN Number"
                    minLength="10"
                    maxLength="10"
                    onChange={(e) => this.setState({ pan: e.target.value })}
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">
                    Pan number must be of 10 characters.
                  </div>
                </div>
              </div>
              <div className="form-outline px-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-key icon" />
                  </span>
                  <input
                    type="password"
                    id="validationCustom05"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter Password"
                    minLength={"8"}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">
                    Password must be greater than 8 characters.
                  </div>
                </div>
              </div>
              <div className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-check icon" />
                  </span>
                  <input
                    type="text"
                    id="validationCustom06"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Confirm Password"
                    minLength={"8"}
                    onChange={(e) => {
                      document
                        .getElementById("validationCustom06")
                        .setCustomValidity(
                          document.getElementById("validationCustom06")
                            .value !==
                            document.getElementById("validationCustom05").value
                            ? "Passwords do not match."
                            : ""
                        );
                      this.setState({ confirmPwd: e.target.value });
                    }}
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">
                    Password does not match.
                  </div>
                </div>
              </div>
              <div id="appear-on-click" className="form-outline px-4 mt-3">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-lock icon" />
                  </span>
                  <input
                    type="password"
                    id="validationCustom07"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter OTP"
                    onChange={(e) => this.setState({ otp: e.target.value })}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="row gx-0 justify-content-md-center">
                <div className="text-center mt-4">
                  <button
                    id="registrationBtn"
                    className="btn btn-primary btn-lg btn-ex-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                    type="submit"
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
