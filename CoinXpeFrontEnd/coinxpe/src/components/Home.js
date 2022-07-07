import React, { PureComponent } from "react";
import axios from "axios";
import "./css/Home.css";
import { AreaChart, Area, Tooltip } from "recharts";

const SlidingImages = [
  "banner1.webp",
  "banner2.png",
  "banner3.png",
  "banner4.jpg",
  "banner5.png",
  "banner6.jpg",
];

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

const baseUrl = "./Images/";
const length = SlidingImages.length;

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataLtc: [],
      dataBtc: [],
      dataEth: [],
      dataXpr: [],
      liveGainers: [
        { currName: "BOOFI", price: "6.37962", perInc: "213.18" },
        { currName: "eRSDL", price: "0.84786", perInc: "177.99" },
        { currName: "BEEINU", price: "0.00544752", perInc: "169.23" },
        { currName: "VEGAS", price: "0.0467064", perInc: "157.45" },
        { currName: "UNM", price: "2466.36", perInc: "133.69" },
        { currName: "AZW", price: "0.168324", perInc: "104.24" },
        { currName: "BITSU", price: "39786.24", perInc: "102.85" },
        { currName: "LITH", price: "0.238524", perInc: "92.12" },
        { currName: "GM", price: "0.00033969", perInc: "76.04" },
      ],
      liveLosers: [
        { currName: "ERC20", price: "0.00215592", perInc: "99.73" },
        { currName: "VLX", price: "0.0276276", perInc: "99.70" },
        { currName: "ORI", price: "0.0235326", perInc: "91.08" },
        { currName: "TSC", price: "0.000000151476", perInc: "80.55" },
        { currName: "CKP", price: "0.00117234", perInc: "67.93" },
        { currName: "IBT", price: "0.0000188838", perInc: "67.10" },
        { currName: "LOCKPAY", price: "0.03244", perInc: "59.57" },
        { currName: "TPC", price: "24.2034", perInc: "54.23" },
        { currName: "DUW", price: "0.0082212", perInc: "48.98" },
      ],
      livePrice: [
        { currName: "BOOFI", price: "6.37962", perInc: "213.18" },
        { currName: "eRSDL", price: "0.84786", perInc: "177.99" },
        { currName: "BEEINU", price: "0.00544752", perInc: "169.23" },
        { currName: "VEGAS", price: "0.0467064", perInc: "157.45" },
        { currName: "UNM", price: "2466.36", perInc: "133.69" },
        { currName: "AZW", price: "0.168324", perInc: "104.24" },
        { currName: "BITSU", price: "39786.24", perInc: "102.85" },
        { currName: "LITH", price: "0.238524", perInc: "92.12" },
        { currName: "GM", price: "0.00033969", perInc: "76.04" },
      ],
      crrLtc: 0,
      crrBtc: 0,
      crrEth: 0,
      crrXpr: 0,
      perLtc: 0,
      perBtc: 0,
      perEth: 0,
      perXpr: 0,
      current: 0,
    };
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.nextSlide();
    }, 2000);

    axios.get("http://localhost:8000/getHistoryPrice/Ltc").then(async (res) => {
      this.setState({
        dataLtc: await res["data"]["Data"]["Data"],
        crrLtc: await res["data"]["Data"]["Data"][24]["high"],
        perLtc:
          (((await res["data"]["Data"]["Data"][24]["high"]) -
            (await res["data"]["Data"]["Data"][0]["high"])) /
            (await res["data"]["Data"]["Data"][0]["high"])) *
          100,
      });
    });
    axios.get("http://localhost:8000/getHistoryPrice/Btc").then(async (res) => {
      this.setState({
        dataBtc: await res["data"]["Data"]["Data"],
        crrBtc: await res["data"]["Data"]["Data"][24]["high"],
        perBtc:
          (((await res["data"]["Data"]["Data"][24]["high"]) -
            (await res["data"]["Data"]["Data"][0]["high"])) /
            (await res["data"]["Data"]["Data"][0]["high"])) *
          100,
      });
    });
    axios.get("http://localhost:8000/getHistoryPrice/Eth").then(async (res) => {
      this.setState({
        dataEth: await res["data"]["Data"]["Data"],
        crrEth: await res["data"]["Data"]["Data"][24]["high"],
        perEth:
          (((await res["data"]["Data"]["Data"][24]["high"]) -
            (await res["data"]["Data"]["Data"][0]["high"])) /
            (await res["data"]["Data"]["Data"][0]["high"])) *
          100,
      });
    });
    axios.get("http://localhost:8000/getHistoryPrice/Xpr").then(async (res) => {
      this.setState({
        dataXpr: await res["data"]["Data"]["Data"],
        crrXpr: await res["data"]["Data"]["Data"][24]["high"],
        perXpr:
          (((await res["data"]["Data"]["Data"][24]["high"]) -
            (await res["data"]["Data"]["Data"][0]["high"])) /
            (await res["data"]["Data"]["Data"][0]["high"])) *
          100,
      });
    });
  }

  nextSlide = () => {
    this.setState({
      current: this.state.current === length - 1 ? 0 : this.state.current + 1,
    });
  };

  render() {
    return (
      <div>
        <section className="slider">
          {SlidingImages.map((slide, index) => {
            return (
              <div
                key={index}
                className={
                  index === this.state.current ? "slide-active" : "slide"
                }
              >
                {index === this.state.current && (
                  <div>
                    <img
                      src={require("" + baseUrl + slide)}
                      width={1414}
                      height={300}
                      className="homeImages"
                      alt={"BannerImg" + index}
                    />
                    <div className="row gx-0 justify-content-center bannerIcon">
                      <i
                        className={
                          index === 0
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                      <i
                        className={
                          index === 1
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                      <i
                        className={
                          index === 2
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                      <i
                        className={
                          index === 3
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                      <i
                        className={
                          index === 4
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                      <i
                        className={
                          index === 5
                            ? "fa fa-circle col-auto activeIcons"
                            : "fa fa-circle col-auto icons"
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
        <div className="row gx-0 justify-content-center">
          <div className="row gx-0 justify-content-center">
            <div className="col-xl-3 col-6">
              <div className="card-body home-card-body">
                <h5 className="card-title row h5">
                  <div className="d-flex justify-content-start px-3">
                    LTC<span className="colorDull2">{" /INR"}</span>
                  </div>
                </h5>
                <div
                  className="row px-4"
                  style={
                    this.state.perLtc.toFixed(3) > 0
                      ? { color: "#82ca9d" }
                      : { color: "#7a5068" }
                  }
                >
                  <div className="col-6">{this.state.crrLtc}</div>
                  <div className="col-6 d-flex justify-content-center">
                    {this.state.perLtc.toFixed(2) + "%"}
                  </div>
                </div>

                <AreaChart
                  margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  width={280}
                  height={80}
                  data={this.state.dataLtc}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7a5068" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7a5068" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke={this.state.perLtc > 0 ? "#82ca9d" : "#7a5068"}
                    fill={
                      this.state.perLtc > 0 ? "url(#colorPv)" : "url(#colorUv)"
                    }
                  />
                </AreaChart>
              </div>
            </div>
            <div className="col-xl-3 col-6">
              <div className="card-body home-card-body">
                <h5 className="card-title row h5">
                  <div className="d-flex justify-content-start px-3">
                    BTC<span className="colorDull2">{" /INR"}</span>
                  </div>
                </h5>
                <div
                  className="row px-4"
                  style={
                    this.state.perBtc.toFixed(3) > 0
                      ? { color: "#82ca9d" }
                      : { color: "#7a5068" }
                  }
                >
                  <div className="col-6">{this.state.crrBtc}</div>
                  <div className="col-6 d-flex justify-content-center">
                    {this.state.perBtc.toFixed(2) + "%"}
                  </div>
                </div>
                <AreaChart
                  margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  width={280}
                  height={80}
                  data={this.state.dataBtc}
                >
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke={this.state.perBtc > 0 ? "#82ca9d" : "#7a5068"}
                    fill={
                      this.state.perBtc > 0 ? "url(#colorPv)" : "url(#colorUv)"
                    }
                  />
                </AreaChart>
              </div>
            </div>
            <div className="col-xl-3 col-6">
              <div className="card-body home-card-body">
                <h5 className="card-title row h5">
                  <div className="d-flex justify-content-start px-3">
                    ETH<span className="colorDull2">{" /INR"}</span>
                  </div>
                </h5>
                <div
                  className="row px-4"
                  style={
                    this.state.perEth.toFixed(3) > 0
                      ? { color: "#82ca9d" }
                      : { color: "#7a5068" }
                  }
                >
                  <div className="col-6">{this.state.crrEth}</div>
                  <div className="col-6 d-flex justify-content-center">
                    {this.state.perEth.toFixed(2) + "%"}
                  </div>
                </div>
                <AreaChart
                  margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  width={280}
                  height={80}
                  data={this.state.dataEth}
                >
                  <Tooltip content="high" />
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke={this.state.perEth > 0 ? "#82ca9d" : "#7a5068"}
                    fill={
                      this.state.perEth > 0 ? "url(#colorPv)" : "url(#colorUv)"
                    }
                  />
                </AreaChart>
              </div>
            </div>
            <div className="col-xl-3 col-6">
              <div className="card-body home-card-body">
                <h5 className="card-title row h5">
                  <div className="d-flex justify-content-start px-3">
                    XPR<span className="colorDull2">{" /INR"}</span>
                  </div>
                </h5>
                <div
                  className="row px-4"
                  style={
                    this.state.perXpr.toFixed(3) > 0
                      ? { color: "#82ca9d" }
                      : { color: "#7a5068" }
                  }
                >
                  <div className="col-6">{this.state.crrXpr}</div>
                  <div className="col-6 d-flex justify-content-center">
                    {this.state.perXpr.toFixed(2) + "%"}
                  </div>
                </div>
                <AreaChart
                  margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  width={280}
                  height={80}
                  data={this.state.dataXpr}
                >
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke={this.state.perXpr > 0 ? "#82ca9d" : "#7a5068"}
                    fill={
                      this.state.perXpr > 0 ? "url(#colorPv)" : "url(#colorUv)"
                    }
                  />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-0 justify-content-start headeroftable ">
          <div
            className="col-auto topGainers activeTableHeader"
            id="gainers"
            onClick={async (e) => {
              this.setState({ livePrice: await this.state.liveGainers });
              document
                .getElementById("losers")
                .classList.remove("activeTableHeader");
              document
                .getElementById("gainers")
                .classList.add("activeTableHeader");
            }}
          >
            <i className="fas fa-chart-line" style={{ marginRight: "5px" }} />
            Gainers
          </div>
          <div
            className="col-auto topLosers"
            id="losers"
            onClick={async (e) => {
              this.setState({ livePrice: await this.state.liveLosers });
              document
                .getElementById("gainers")
                .classList.remove("activeTableHeader");
              document
                .getElementById("losers")
                .classList.add("activeTableHeader");
            }}
          >
            <i
              className="fas fa-chart-line-down"
              style={{ marginRight: "5px" }}
            />
            Losers
          </div>
        </div>
        <div className="row gx-0 justify-content-center ">
          <table className="table tableHome">
            <thead>
              <tr className="tableHeader">
                <th>Pair</th>
                <th>Last Price</th>
                <th>24h Chg%</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {this.state.livePrice.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <img
                        src={require("./Images/market/" +
                          MarketImages[key % 15])}
                        width={20}
                        height={20}
                        className="marketImg"
                        alt={"logo" + key}
                      />
                      {" " + val["currName"]}
                      <span className="colorDull">{" /USD"}</span>
                    </td>
                    <td>{parseFloat(val["price"])}</td>
                    <td>
                      <div
                        className={
                          val["perInc"] > 0 ? "greenLabel" : "redLabel"
                        }
                      >
                        {val["perInc"] + " %"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="heigh30 row gx-0"></div>
        </div>
      </div>
    );
  }
}
