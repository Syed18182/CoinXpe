import React, { Component } from "react";
import ModalForm2 from "./ModalForm2";
import axios from "axios";
import "./css/Settings.css";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      bankdetails: { accountno: "", accountholdername: "", ifsc: "" },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.displayRazorpay = this.displayRazorpay.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.updateaccountdata = this.updateaccountdata.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8000/getBankDetails/" + this.props.userdata["user_id"]
      )
      .then(async (res) => {
        if (res["data"][0]["accountno"] === null) {
          document.getElementById("displayifnoaccount").style.display = "flex";
        } else {
          this.setState({ bankdetails: await res["data"][0] });
        }
      });
  }

  updateaccountdata = async (accountdetails) => {
    this.setState({ bankdetails: await accountdetails });
    document.getElementById("displayifnoaccount").style.display = "none";
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  displayRazorpay = async () => {
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("RazorPay SDK failed to load. Check your network connection...");
      return;
    }

    var data;
    await axios.post("http://localhost:8000/razorPay").then(async (res) => {
      data = await res["data"];
    });

    const options = {
      key: "YourApiKey",
      name: "CoinXpe",
      currency: "INR",
      amount: "50000",
      description: "Add money to your CoinXpe account",
      image: require("./logo/logo.png"),
      order_id: await data["OrderId"],
      theme: {
        color: "#0f233c",
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  render() {
    return (
      <div className="container emp-profile">
        <ModalForm2
          userdata={this.props.userdata}
          show={this.state.show}
          handleClose={this.hideModal}
          updateaccountdata={this.updateaccountdata}
        />
        <form method="post">
          <div className="row gx-0">
            <div className="col-md-10">
              <div className="profile-head">
                <h5 className="px-3">{"Ansh"}</h5>
                <h6 className="px-3">
                  {this.props.userdata["curr"] === null
                    ? "0"
                    : "Rs. " + this.props.userdata["curr"][0]["INR"]}
                </h6>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <button
                className="profile-edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.displayRazorpay();
                }}
              >
                Add Money
              </button>
              <button
                className="profile-edit-btn mt-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="row gx-0 ">
            <div className="col-md-6">
              <div className="profile-tab" id="myTabContent">
                <div id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>User Name:</label>
                    </div>
                    <div className="col-6">
                      <p>{this.props.userdata["username"]}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>Email:</label>
                    </div>
                    <div className="col-6">
                      <p>{this.props.userdata["email"]}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>Aadhar:</label>
                    </div>
                    <div className="col-6">
                      <p>{this.props.userdata["aadhar"]}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>Pan:</label>
                    </div>
                    <div className="col-6">
                      <p>{this.props.userdata["pan"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-tab" id="myTabContent">
                <div id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>Account Number:</label>
                    </div>
                    <div className="col-6">
                      <p>
                        {this.state.bankdetails["accountno"] === null
                          ? ""
                          : this.state.bankdetails["accountno"]}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>Owner Name:</label>
                    </div>
                    <div className="col-6">
                      <p>
                        {this.state.bankdetails["accountholdername"] === null
                          ? ""
                          : this.state.bankdetails["accountholdername"]}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label style={{ color: "black" }}>I.F.S.C.:</label>
                    </div>
                    <div className="col-6">
                      <p>
                        {this.state.bankdetails["ifsc"] === null
                          ? ""
                          : this.state.bankdetails["ifsc"]}
                      </p>
                    </div>
                  </div>
                  <div
                    className="row gx-0 justify-content-center mt-4"
                    id="displayifnoaccount"
                    style={{ display: "none" }}
                  >
                    <div className="col-8">
                      <button
                        className="profile-edit-btn mt-2"
                        onClick={(e) => {
                          e.preventDefault();
                          this.showModal();
                        }}
                      >
                        Add Account Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
