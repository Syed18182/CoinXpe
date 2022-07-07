import React, { Component } from "react";
import axios from "axios";
import ModalForm from "./ModalForm";
import "./css/Home.css";
import "./css/BuySell.css";
import { BarChart, Tooltip, XAxis, YAxis, Bar } from "recharts";

function GraphComponent(props) {
  return (
    <div className="row gx-0 justify-content-center mt-5">
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        width={1380}
        height={380}
        data={props.dataCurr}
      >
        <Tooltip />
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

        <XAxis />
        <YAxis
          dataKey="high"
          textAnchor="end"
          sclaeToFit="true"
          verticalAnchor="start"
          interval={0}
          angle="-40"
        ></YAxis>
        <Bar
          type="monotone"
          dataKey="close"
          stroke={"#82ca9d"}
          fill={"#82ca9d"}
        />
      </BarChart>
    </div>
  );
}

function NewsComponent(props) {
  const news = props.news;

  return (
    <div className="row gx-0 justify-content-center mt-5">
      <ul>
        {news.map((val, key) => {
          return (
            <li style={{ marginLeft: "150px", marginRight: "150px" }} key={key}>
              <span style={{ textDecoration: "underline" }}>
                {val["title"] + ":"}
              </span>
              <span> {val["description"]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MidComponent(props) {
  return props.screen === 1 ? (
    <GraphComponent dataCurr={props.dataCurr} />
  ) : (
    <NewsComponent dataCurr={props.dataCurr} news={props.news} />
  );
}

export default class BuySell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCurr: [],
      index: 1,
      screen: 1,
      show: false,
      data: [],
      news: [],
      secondTableData: {},
      scanId: "",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateScreen = this.updateScreen.bind(this);
  }

  showModal = (iodex) => {
    this.setState({ show: true, index: iodex });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  updateScreen = () => {
    this.setState({
      screen: this.state.screen === 1 ? 2 : 1,
    });
  };

  componentDidMount() {
    const today = new Date();
    var dateToday =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    axios
      .get(
        "https://newsapi.org/v2/everything?q=crypto&from=" +
          dateToday +
          "&sortBy=popularity&apiKey=0650eca3f75d4a16beb8c410626d94be"
      )
      .then(async (res) => {
        this.setState({
          news:
            (await res["data"]["articles"]) !== null
              ? res["data"]["articles"]
              : this.state.news,
        });
      });
    axios
      .get("http://localhost:8000/getHistoryPrice/" + this.props.currName)
      .then(async (res) => {
        this.setState({
          dataCurr: await res["data"]["Data"]["Data"],
        });
      });
  }

  render() {
    return (
      <div>
        <ModalForm
          userdata={this.props.userdata}
          currName={this.props.currName}
          currAmt={this.props.currAmt}
          show={this.state.show}
          secondTableData={this.state.secondTableData}
          index={this.state.index}
          scanId={this.state.scanId}
          handleClose={this.hideModal}
        />
        <div className="row gx-0" style={{ marginTop: "10px" }}>
          <i
            className="fa fa-arrow-left"
            style={{
              cursor: "pointer",
              paddingLeft: "13px",
              paddingTop: "13px",
            }}
            onClick={(e) => {
              this.props.updateScreenMarket(1, "", "");
            }}
          />
          <h1 style={{ paddingLeft: "130px" }}>{this.props.currName}</h1>
          <p style={{ color: "red", paddingLeft: "130px" }}>
            {this.props.currAmt}
          </p>
        </div>
        <div
          className="row gx-0 justify-content-start headeroftable "
          style={{ marginLeft: "80px" }}
        >
          <div
            className="col-auto topGainers activeTableHeader"
            id="gainers"
            onClick={async (e) => {
              this.updateScreen(2);
              document
                .getElementById("losers")
                .classList.remove("activeTableHeader");
              document
                .getElementById("gainers")
                .classList.add("activeTableHeader");
            }}
          >
            <i className="fa fa-area-chart" style={{ marginRight: "5px" }} />
            Performance
          </div>
          <div
            className="col-auto topLosers"
            id="losers"
            onClick={async (e) => {
              this.updateScreen(2);
              document
                .getElementById("gainers")
                .classList.remove("activeTableHeader");
              document
                .getElementById("losers")
                .classList.add("activeTableHeader");
            }}
          >
            <i className="fa fa-newspaper-o" style={{ marginRight: "5px" }} />
            News
          </div>
        </div>
        <MidComponent
          dataCurr={this.state.dataCurr}
          updateScreen={this.updateScreen}
          screen={this.state.screen}
          news={this.state.news}
        />
        <div className="row gx-0 justify-content-center mb-5">
          <button
            className="col-6 sellBtn"
            onClick={(e) => {
              this.showModal(1);
            }}
          >
            SELL
          </button>
          <button
            className="col-6 buyBtn"
            onClick={(e) => {
              this.showModal(2);
            }}
          >
            BUY
          </button>
        </div>
      </div>
    );
  }
}
