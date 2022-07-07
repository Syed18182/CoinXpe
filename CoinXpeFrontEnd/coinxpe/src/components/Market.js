import React, { Component } from "react";
import axios from "axios";
import "./css/Market.css";

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
const Percent = [
  "-2.69",
  "-4.68",
  "-0.01",
  "-3.71",
  "-0.01",
  "-3.79",
  "-3.84",
  "4.62",
  "0.0",
  "0.0",
];
const click = [1, 1, 0, 1, 1];
export default class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins100: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      searchedCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      inrCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      usdtCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      btcCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      ethCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      xrpCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      usdCoins: [
        {
          currName: "BTC",
          price: "38330.8298309061",
          perInc: "0",
        },
      ],
      converValue: "INR",
    };
    this.updateScreen = this.updateScreen.bind(this);
    this.stateUpdate = this.stateUpdate.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.stateUpdate();
  }

  stateUpdate = async () => {
    var inrCoins = [];
    var usdCoins = [];
    await axios
      .get("http://localhost:8000/getTopLivePrice/10/INR")
      .then(async (res) => {
        inrCoins = await res["data"];
      });
    await axios
      .get("http://localhost:8000/getTopLivePrice/10/USD")
      .then(async (res) => {
        usdCoins = await res["data"];
      });
    await this.setState({
      inrCoins: await inrCoins,
      coins100: await inrCoins,
      searchedCoins: await inrCoins,
      usdCoins: await usdCoins,
    });
  };

  updateScreen = (pointerId) => {
    document.getElementById("eth").classList.remove("activa");
    document.getElementById("btc").classList.remove("activa");
    document.getElementById("inr").classList.remove("activa");
    document.getElementById("usdt").classList.remove("activa");
    document.getElementById("xrp").classList.remove("activa");
    document.getElementById(pointerId).classList.add("activa");
  };

  updateData = (data) => {
    this.setState({ searchedCoins: data });
  };

  render() {
    return (
      <div>
        <div className="row gx-0 pt-2 marketHeader">
          <div className="col-8">
            <div className="alignMiddle ">Market</div>
          </div>
          <div className="form-outline topPadder col-4 px-4">
            <div className="input-group">
              <form className="formSearch">
                <input
                  type="search"
                  placeholder="Search here ..."
                  className="inputSearch"
                  onChange={async (e) => {
                    var searchedData = [];
                    var k = 0;
                    this.state.coins100.map((oneData, key) => {
                      if (
                        oneData.currName.match(e.target.value.toUpperCase()) !==
                        null
                      ) {
                        searchedData[k] = this.state.coins100[key];
                        k++;
                      }
                      return 0;
                    });
                    this.updateData(searchedData);
                  }}
                />
                <i className="fa fa-search faSearch" />
              </form>
            </div>
          </div>
          <div className="row gx-0 justify-content-center smallFont">
            <div className="col-2 d-flex justify-content-center">
              <div
                id="eth"
                className="d-flex justify-content-center pointering"
                onClick={async (e) => {
                  this.updateScreen("eth");
                  if (click[0] === 1) {
                    await axios
                      .get("http://localhost:8000/getTopLivePrice/10/ETH")
                      .then(async (res) => {
                        this.setState({
                          ethCoins: await res["data"],
                          coins100: await res["data"],
                          searchedCoins: await res["data"],
                          converValue: "ETH",
                        });
                      });
                    click[0] = 0;
                  } else {
                    this.updateData(this.state.ethCoins);
                  }
                }}
              >
                ETH
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div
                id="btc"
                className="d-flex justify-content-center pointering"
                onClick={async (e) => {
                  this.updateScreen("btc");
                  if (click[1] === 1) {
                    await axios
                      .get("http://localhost:8000/getTopLivePrice/10/BTC")
                      .then(async (res) => {
                        this.setState({
                          btcCoins: await res["data"],
                          coins100: await res["data"],
                          searchedCoins: await res["data"],
                          converValue: "BTC",
                        });
                      });
                    click[1] = 0;
                  } else {
                    this.updateData(this.state.btcCoins);
                  }
                }}
              >
                BTC
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div
                id="inr"
                className="activa d-flex justify-content-center pointering"
                onClick={async (e) => {
                  this.updateScreen("inr");
                  this.updateData(this.state.inrCoins);
                }}
              >
                INR
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div
                id="usdt"
                className="d-flex justify-content-center pointering"
                onClick={async (e) => {
                  this.updateScreen("usdt");
                  if (click[3] === 1) {
                    await axios
                      .get("http://localhost:8000/getTopLivePrice/10/USDT")
                      .then(async (res) => {
                        this.setState({
                          usdtCoins: await res["data"],
                          coins100: await res["data"],
                          searchedCoins: await res["data"],
                          converValue: "USDT",
                        });
                      });
                    click[3] = 0;
                  } else {
                    this.updateData(this.state.usdtCoins);
                  }
                }}
              >
                USDT
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div
                id="xrp"
                className="d-flex justify-content-center pointering"
                onClick={async (e) => {
                  this.updateScreen("xrp");
                  if (click[4] === 1) {
                    await axios
                      .get("http://localhost:8000/getTopLivePrice/10/XRP")
                      .then(async (res) => {
                        this.setState({
                          xrpCoins: await res["data"],
                          coins100: await res["data"],
                          searchedCoins: await res["data"],
                          converValue: "XRP",
                        });
                      });
                    click[4] = 0;
                  } else {
                    this.updateData(this.state.xrptCoins);
                  }
                }}
              >
                XRP
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-0 justify-content-center m-4">
          <div className="row gx-0 justify-content-center">
            <table className="table tableMarket">
              <thead>
                <tr className="tableHeader row gx-0">
                  <th className="col-4">Pair</th>
                  <th className="col-4">Last Price</th>
                  <th className="col-4">24h Chg%</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {this.state.searchedCoins.map((val, key) => {
                  var percentChange = parseFloat(Percent[key]);
                  return (
                    <tr key={key} className="row gx-0">
                      <td
                        className="col-4"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          this.props.updateScreenMarket(
                            2,
                            val["currName"],
                            parseFloat(val["price"]).toFixed(4)
                          );
                        }}
                      >
                        <img
                          src={require("./Images/market/" +
                            MarketImages[key % 15])}
                          width={20}
                          height={20}
                          className="marketImg"
                          alt={"logo" + key}
                        />
                        {val["currName"]}
                        <span className="colorDull2">
                          {" /" + this.state.converValue}
                        </span>
                        <div className="colorDull2">1.00</div>
                      </td>
                      <td className="col-4">
                        {parseFloat(val["price"]).toFixed(4)}
                        <div className="colorDull2">
                          {"$" +
                            parseFloat(
                              this.state.usdCoins[key]["price"]
                            ).toFixed(4)}
                        </div>
                      </td>
                      <td className="col-4">
                        <div
                          className={
                            percentChange <= 0 ? "redLabelm" : "greenLabelm"
                          }
                        >
                          {percentChange === 0 ? "--%" : percentChange + "%"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
