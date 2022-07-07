import React, { Component } from "react";
import axios from "axios";
import "./css/Usertable.css";

export class UpdateUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      pwd: "",
      aadhar_no: "",
      username: "",
      pan_no: "",
    };
  }

  componentDidMount() {
    this.props.updateData(this.props.data);
    for (let key = 0; key < this.props.SearchedData.length; key++) {
      document.getElementById("tb1" + key).disabled = true;
      document.getElementById("tb2" + key).disabled = true;
      document.getElementById("tb3" + key).disabled = true;
    }
  }

  render() {
    const classname =
      this.props.value === 0
        ? "applyonlytransition collapsed"
        : "applymarginbody-pd";
    return (
      <div id="body-pd" className={"dashbody " + classname}>
        <div className="row py-4">
          <div className="col-lg-12">
            <div className="card py-4">
              <div className="card-title">
                <h2>
                  <b className="d-flex justify-content-center">Update Users</b>
                </h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table tableUser">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>S.No.</th>
                        <th style={{ textAlign: "center" }}>User Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Aadhar</th>
                        <th style={{ textAlign: "center" }}>PAN Number</th>
                        <th style={{ textAlign: "center" }}>I.V.</th>
                        <th style={{ textAlign: "center" }}>Enter Password</th>
                        <th style={{ textAlign: "center" }}>Decrypt</th>
                        <th style={{ textAlign: "center" }}>Enter Username</th>
                        <th style={{ textAlign: "center" }}>Enter Aadhar_no</th>
                        <th style={{ textAlign: "center" }}>Enter Pan_no</th>
                        <th style={{ textAlign: "center" }}>Update</th>
                      </tr>
                    </thead>
                    <tbody id="gridTable">
                      {this.props.SearchedData.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td style={{ textAlign: "center" }}>{key + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {val["username"]}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {val["email"]}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {val["aadhar_no"]}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {val["pan_no"]}
                            </td>
                            <td style={{ textAlign: "center" }}>{val["iv"]}</td>
                            <td style={{ textAlign: "center" }}>
                              <input
                                placeholder="Password"
                                onChange={(e) => {
                                  this.setState({ pwd: e.target.value });
                                }}
                              />
                            </td>
                            <td
                              style={{ textAlign: "center" }}
                              onClick={(e) => {
                                axios
                                  .post(
                                    "http://localhost:8000/decryptforAdmin",
                                    {
                                      username: val["username"],
                                      email: val["email"],
                                      aadhar: val["aadhar_no"],
                                      pan: val["pan_no"],
                                      iv: val["iv"],
                                      password: this.state.pwd,
                                    }
                                  )
                                  .then(async (res) => {
                                    var searchedData = [];
                                    var k = 0;
                                    this.props.data.map((oneData, key2) => {
                                      if (key !== key2) {
                                        searchedData[k] = this.props.data[key2];
                                        k++;
                                      } else {
                                        searchedData[k] = res["data"];
                                        k++;
                                      }
                                      return 0;
                                    });
                                    this.props.updateData(searchedData);
                                    for (
                                      let k = 0;
                                      k < this.props.SearchedData.length;
                                      k++
                                    ) {
                                      if (k === key) {
                                        document.getElementById(
                                          "tb1" + k
                                        ).disabled = false;
                                        document.getElementById(
                                          "tb2" + k
                                        ).disabled = false;
                                        document.getElementById(
                                          "tb3" + k
                                        ).disabled = false;
                                      } else {
                                        document.getElementById(
                                          "tb1" + k
                                        ).disabled = true;
                                        document.getElementById(
                                          "tb2" + k
                                        ).disabled = true;
                                        document.getElementById(
                                          "tb3" + k
                                        ).disabled = true;
                                      }
                                    }
                                  });
                              }}
                            >
                              <i
                                className="fa fa-angle-double-right"
                                style={{ fontSize: "20px", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <input
                                id={"tb1" + key}
                                placeholder="User Name"
                                onChange={(e) => {
                                  this.setState({ username: e.target.value });
                                }}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <input
                                id={"tb2" + key}
                                placeholder="Aadhar"
                                onChange={(e) => {
                                  this.setState({ aadhar_no: e.target.value });
                                }}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <input
                                id={"tb3" + key}
                                placeholder="Pan"
                                onChange={(e) => {
                                  this.setState({ pan_no: e.target.value });
                                }}
                              />
                            </td>
                            <td
                              style={{ textAlign: "center" }}
                              onClick={(e) => {
                                axios
                                  .post(
                                    "http://localhost:8000/updateUserbyAdmin",
                                    {
                                      username: this.state.username,
                                      email: val["email"],
                                      aadhar_no: this.state.aadhar_no,
                                      pan_no: this.state.pan_no,
                                      iv: val["iv"],
                                      password: this.state.pwd,
                                    }
                                  )
                                  .then(async (res) => {
                                    axios
                                      .get("http://localhost:8000/getAllUsers")
                                      .then(async (res) => {
                                        this.props.updateData(
                                          await res["data"]
                                        );
                                        this.props.updateMainData(
                                          await res["data"]
                                        );
                                      });
                                    for (
                                      let key = 0;
                                      key < this.props.SearchedData.length;
                                      key++
                                    ) {
                                      document.getElementById(
                                        "tb1" + key
                                      ).value = "";
                                      document.getElementById(
                                        "tb2" + key
                                      ).value = "";
                                      document.getElementById(
                                        "tb3" + key
                                      ).value = "";
                                      document.getElementById(
                                        "tb1" + key
                                      ).disabled = true;
                                      document.getElementById(
                                        "tb2" + key
                                      ).disabled = true;
                                      document.getElementById(
                                        "tb3" + key
                                      ).disabled = true;
                                    }
                                  });
                              }}
                            >
                              <i
                                className="fa fa-angle-double-right"
                                style={{ fontSize: "20px", cursor: "pointer" }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUserTable;
