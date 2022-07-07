import "./css/Login.css";
import axios from "axios";
import React, { Component } from "react";
import LoginHeader from "./LoginHeader";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  render() {
    return (
      <div>
        <LoginHeader />
        <div className="row gx-0 justify-content-sm-center">
          <div className="loginbox pt-4">
            <form
              id="form1"
              className="needs-validation"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                var form = document.getElementById("form1");
                if (!form.checkValidity()) {
                  e.stopPropagation();
                } else if (
                  this.state.email === "ADMIN777@coinxpe.com" &&
                  this.state.password === "ADMIN1234"
                ) {
                  this.props.changeScreen(3, []);
                } else {
                  axios
                    .get(
                      "http://localhost:8000/getUser/" +
                        this.state.email +
                        "/" +
                        this.state.password
                    )
                    .then((res) => {
                      this.props.changeScreen(2, res["data"]);
                    })
                    .catch((e) => {
                      document.getElementById("invalid-feed").style.display =
                        "block";
                    });
                }
                form.classList.add("was-validated");
              }}
            >
              <div className="form-outline mb-4 px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-envelope icon" />
                  </span>
                  <input
                    type="email"
                    id="validationCustom01"
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
              <div className="form-outline px-4">
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-key icon" />
                  </span>
                  <input
                    type="password"
                    id="validationCustom02"
                    className="form-control form-control-lg"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Enter Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    minLength={"8"}
                    required
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">Incorrect Password</div>
                </div>
              </div>
              <div id="invalid-feed" className="px-4">
                Invalid Email or Password
              </div>
              <div className="row justify-content-end">
                <div
                  className="forgetPwdBtn mt-2 px-5"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.changeScreenL(3);
                  }}
                >
                  Forget Password?
                </div>
              </div>
              <div className="row gx-0 justify-content-md-center">
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-ex-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Sign In
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
                      this.props.changeScreenL(2);
                    }}
                  >
                    Create Account
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
