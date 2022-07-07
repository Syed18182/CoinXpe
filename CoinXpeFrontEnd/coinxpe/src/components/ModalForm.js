import React, { Component } from "react";
import axios from "axios";
import "./css/ModalForm.css";

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "",
      coinAmt: "",
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
              <b>{this.props.currName}</b>
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
                  <i className="fa fa-btc icon" />
                </span>
                <input
                  type="text"
                  disabled={true}
                  id="validationCustom01"
                  className="form-control form-control-lg"
                  aria-describedby="inputGroupPrepend"
                  placeholder="BTC Amount"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-outline mb-4 px-4">
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="fa fa-money icon" />
                </span>
                <input
                  type="text"
                  id="validationCustom02"
                  className="form-control form-control-lg"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    this.setState({
                      amt: e.target.value,
                      coinAmt: e.target.value / this.props.currAmt,
                    });
                    document.getElementById("validationCustom01").value =
                      e.target.value / this.props.currAmt;
                  }}
                  required
                  autoComplete="off"
                />
              </div>
              <div
                id="appearonclick"
                className="spinthis"
                style={{ color: "red", display: "none" }}
              >
                <i className="fa fa-spinner" id="thisIcon" />
                <span id="thisDiv">
                  {this.props.index === 1
                    ? " Sell Order Placed"
                    : " Buy Order Placed"}
                </span>
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
                    e.preventDefault();
                    if (this.state.amt === "") {
                      document.getElementById("thisIcon").style.display =
                        "none";
                      document.getElementById("thisDiv").innerHTML =
                        " All Fields Required";
                      document.getElementById("appearonclick").style.display =
                        "block";
                      await setTimeout(() => {
                        document.getElementById("appearonclick").style.display =
                          "none";
                        document.getElementById("thisIcon").style.display =
                          "inline-block";
                        document.getElementById("thisDiv").innerHTML =
                          this.props.index === 1
                            ? " Sell Order Placed"
                            : " Buy Order Placed";
                      }, 2000);
                    } else {
                      this.props.index === 1
                        ? axios
                            .post("http://localhost:8000/sellCoin", [
                              {
                                currency: this.props.currName,
                                coinamount: this.state.coinAmt,
                                amount: this.state.amt,
                                email: this.props.userdata["email"],
                              },
                            ])
                            .then(async (res) => {
                              document.getElementById(
                                "appearonclick"
                              ).style.display = "block";
                              await setTimeout(() => {
                                document.getElementById(
                                  "thisIcon"
                                ).style.display = "none";
                                document.getElementById("thisDiv").innerHTML =
                                  res["data"]["ErrMessage"] ===
                                  "Insufficient Balance"
                                    ? "Insufficient Balance"
                                    : "Sell Successfull";
                              }, 2000);
                              await setTimeout(() => {
                                document.getElementById(
                                  "appearonclick"
                                ).style.display = "none";
                                document.getElementById(
                                  "thisIcon"
                                ).style.display = "inline-block";
                                document.getElementById("thisDiv").innerHTML =
                                  this.props.index === 1
                                    ? " Sell Order Placed"
                                    : " Buy Order Placed";
                              }, 5000);
                            })
                            .catch(async (err) => {})
                        :  axios
                        .post("http://localhost:8000/buyCoin", [
                          {
                            currency: this.props.currName,
                            coinamount: this.state.coinAmt,
                            amount: this.state.amt,
                            email: this.props.userdata["email"],
                          },
                        ])
                        .then(async (res) => {
                          document.getElementById(
                            "appearonclick"
                          ).style.display = "block";
                          await setTimeout(() => {
                            document.getElementById(
                              "thisIcon"
                            ).style.display = "none";
                            document.getElementById("thisDiv").innerHTML =
                              res["data"]["ErrMessage"] ===
                              "Insufficient Balance"
                                ? "Insufficient Balance"
                                : "Buy Successfull";
                          }, 2000);
                          await setTimeout(() => {
                            document.getElementById(
                              "appearonclick"
                            ).style.display = "none";
                            document.getElementById(
                              "thisIcon"
                            ).style.display = "inline-block";
                            document.getElementById("thisDiv").innerHTML =
                              this.props.index === 1
                                ? " Sell Order Placed"
                                : " Buy Order Placed";
                          }, 5000);
                        })
                        .catch(async (err) => {})
                    }
                  }}
                >
                  {this.props.index === 1 ? "Sell" : "Buy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
