import React, { Component } from "react";
import axios from "axios";
import "./css/Usertable.css";

export class RestoreUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.props.updateData(this.props.data);
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
                  <b className="d-flex justify-content-center">Restore Users</b>
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
                            <td
                              style={{ textAlign: "center" }}
                              onClick={(e) => {
                                axios
                                  .post(
                                    "http://localhost:8000/restoreUserbyAdmin",
                                    {
                                      email: val["email"],
                                      username: val["username"],
                                      aadhar_no: val["aadhar_no"],
                                      pan_no: val["pan_no"],
                                      iv: val["iv"],
                                      password: val["password"],
                                    }
                                  )
                                  .then(async (res) => {
                                    var searchedData = [];
                                    var k = 0;
                                    this.props.data.map((oneData, key) => {
                                      if (
                                        oneData.email.match(val["email"]) ===
                                        null
                                      ) {
                                        searchedData[k] = this.props.data[key];
                                        k++;
                                      }
                                      return 0;
                                    });
                                    axios
                                      .get("http://localhost:8000/getAllUsers")
                                      .then(async (res) => {
                                        this.props.updatethatData(
                                          await res["data"]
                                        );
                                        this.props.updatethatMainData(
                                          await res["data"]
                                        );
                                      });
                                    this.props.updateData(searchedData);
                                    this.props.updateMainData(searchedData);
                                  });
                              }}
                            >
                              <i
                                className="fa fa-refresh"
                                style={{ cursor: "pointer" }}
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

export default RestoreUser;
