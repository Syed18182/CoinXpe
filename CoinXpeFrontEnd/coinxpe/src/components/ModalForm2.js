import React, { Component } from "react";
import axios from "axios";
import "./css/ModalForm.css";

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountno: "",
      accountholdername: "",
      ifsc: "",
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }

  render() {
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <div className="card edited-card py-4" ref={this.wrapperRef}>
          <div className="card-title row">
            <h2 className="col-10 px-5">
              <b>Enter Account Details</b>
            </h2>
            <div className="bg-inherit col-2 d-flex justify-content-end px-4">
              <i
                className="bx bx-x colorblack"
                onClick={this.props.handleClose}
                type="button"
              ></i>
            </div>
          </div>
          <div className="card-body">
            <div className="form-outline mb-4 px-4">
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="fa fa-bank icon" />
                </span>
                <input
                  type="text"
                  id="validationCustom01"
                  className="form-control form-control-lg"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Account Number"
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    this.setState({ accountno: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="form-outline mb-4 px-4">
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="fa fa-key icon" />
                </span>
                <input
                  type="text"
                  id="validationCustom01"
                  className="form-control form-control-lg"
                  aria-describedby="inputGroupPrepend"
                  placeholder="I.F.S.C."
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    this.setState({ ifsc: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="form-outline mb-4 px-4">
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="fa fa-user icon" />
                </span>
                <input
                  type="text"
                  id="validationCustom02"
                  className="form-control form-control-lg"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Account Holder Name"
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    this.setState({ accountholdername: e.target.value });
                  }}
                />
              </div>
              <div
                id="appearonclick"
                className="spinthis"
                style={{ color: "red", display: "none" }}
              >
                <span id="thisDiv">Updated Successfully...</span>
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
                  onClick={async (e) => {
                    if (
                      this.state.accountholdername === "" ||
                      this.state.ifsc === "" ||
                      this.state.accountno === ""
                    ) {
                      document.getElementById("thisDiv").innerHTML =
                        "All Fields Required";
                      document.getElementById("appearonclick").style.display =
                        "block";
                      await setTimeout(() => {
                        document.getElementById("appearonclick").style.display =
                          "none";
                        document.getElementById("thisDiv").innerHTML =
                          "Updated Successfully...";
                      }, 2000);
                    } else {
                      axios
                        .post("http://localhost:8000/registerBankDetails", {
                          accountno: this.state.accountno,
                          accountholdername: this.state.accountholdername,
                          ifsc: this.state.ifsc,
                          user_id: this.props.userdata["user_id"],
                        })
                        .then(async (res) => {
                          document.getElementById(
                            "appearonclick"
                          ).style.display = "block";
                          await setTimeout(() => {
                            document.getElementById(
                              "appearonclick"
                            ).style.display = "none";
                            this.props.updateaccountdata({
                              accountno: this.state.accountno,
                              accountholdername: this.state.accountholdername,
                              ifsc: this.state.ifsc,
                              user_id: this.props.userdata["user_id"],
                            });
                            this.props.handleClose();
                          }, 3000);
                        });
                    }
                  }}
                >
                  Add Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
