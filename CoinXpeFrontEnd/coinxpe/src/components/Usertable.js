import React, { Component } from "react";
import axios from "axios";
import "./css/Usertable.css";

export class Usertable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      pwd: "",
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
                  <b className="d-flex justify-content-center">View Users</b>
                </h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table tableUser m-t-20">
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
                            <td style={{ textAlign: "center" }}>
                              <i
                                className="fa fa-angle-double-right"
                                style={{ fontSize: "20px", cursor: "pointer" }}
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
                                          searchedData[k] =
                                            this.props.data[key2];
                                          k++;
                                        } else {
                                          searchedData[k] = res["data"];
                                          k++;
                                        }
                                        return 0;
                                      });
                                      this.props.updateData(searchedData);
                                    });
                                }}
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

export default Usertable;
