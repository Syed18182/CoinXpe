import React, { Component } from "react";
import axios from "axios";
import "./css/Wallet.css";

const MarketImages = [
  "ae.png",
  "aion.png",
  "bat.png",
  "BCH.png",
  "bee.png",
  "bitcoin.png",
  "bnt.png",
  "btc.png",
  "dnt.png",
  "elf.png",
  "EOS.png",
  "ETC.png",
  "eth.png",
  "NEO.png",
  "RIPLE.png",
];
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCryptoamt: [],
      totalAssets: 0,
      inrCoins: [],
    };
    this.stateUpdate = this.stateUpdate.bind(this);
  }

  componentDidMount() {
    this.stateUpdate();
  }

  stateUpdate = async () => {
    await axios
      .get("http://localhost:8000/getCurr/" + this.props.userdata["email"])
      .then(async (res) => {
        this.setState({
          userCryptoamt: res["data"][0]["currency"],
        });
      });
    var inrCoins = [];
    await axios
      .get("http://localhost:8000/getTopLivePrice/10/INR")
      .then(async (res) => {
        inrCoins = await res["data"];
      });
    await this.setState({
      inrCoins: await inrCoins,
    });
    var tamount = 0;
    this.state.userCryptoamt === null
      ? this.setState({ totalAssets: 0 })
      : this.state.userCryptoamt.map((val) => {
          Object.keys(val).map((e, i) => {
            if (val[e] !== "INR") {
              this.state.inrCoins.map((val1, key1) => {
                if (val1["currName"] === e) {
                  tamount += val1["price"] * val[e];
                }
                return 0;
              });
            }
            return 0;
          });
          return 0;
        });
    this.setState({ totalAssets: tamount });
  };

  render() {
    return (
      <div>
        <div className="heading">
          <div className="inner-header flex row">
            <p>{"Total Asseets (INR)"}</p>
            <h1 className="h1">{this.state.totalAssets}</h1>
          </div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-170 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x={68} y={0} fill="#1dbff5" />
              <use xlinkHref="#gentle-wave" x={68} y={1} fill="#1dbff5" />
              <use xlinkHref="#gentle-wave" x={68} y={2} fill="#24bff5" />
              <use xlinkHref="#gentle-wave" x={68} y={3} fill="#54c8f7" />
            </g>
          </svg>
        </div>
        <table className="table walletTable" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="tableTitle">
              <th>Coin Type</th>
              <th>{"Value (INR)"}</th>
              <th>{"Quantity"}</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {this.state.userCryptoamt !== null &&
              this.state.userCryptoamt.map((val, key) => {
                return Object.keys(val).map((e, i) => {
                  if (e !== "INR") {
                    return (
                      <tr key={key}>
                        <th scope="row">
                          <img
                            src={require("./Images/market/" +
                              MarketImages[key % 15])}
                            width={20}
                            height={20}
                            className="marketImg"
                            alt={"logo" + key}
                          />
                          {" " + e}
                        </th>
                        <td>
                          {this.state.inrCoins.map((val1, key1) => {
                            if (val1["currName"] === e) {
                              return val1["price"] * val[e];
                            }
                            return "";
                          })}
                        </td>
                        <td>{val[e]}</td>
                      </tr>
                    );
                  }
                  return <tr key={key}></tr>;
                });
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
