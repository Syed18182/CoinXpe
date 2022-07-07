import React, { Component } from "react";
import BuySell from "./BuySell";
import Market from "./Market";

function ChangingScreen(props) {
  if (props.screen === 1) {
    return (
      <Market
        updateScreenMarket={props.updateScreenMarket}
        updateCurrname={props.updateCurrname}
      />
    );
  } else if (props.screen === 2) {
    return (
      <BuySell
        updateScreenMarket={props.updateScreenMarket}
        currAmt={props.currAmt}
        userdata={props.userdata}
        currName={props.currName}
      />
    );
  }
  return <></>;
}

export default class MarketSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
      currName: "",
    };
    this.updateScreenMarket = this.updateScreenMarket.bind(this);
  }

  updateScreenMarket = (screenNo, name, amt) => {
    this.setState({ screen: screenNo, currName: name, currAmt: amt });
  };

  render() {
    return (
      <div>
        <ChangingScreen
          screen={this.state.screen}
          updateScreenMarket={this.updateScreenMarket}
          currName={this.state.currName}
          userdata={this.props.userdata}
          currAmt={this.state.currAmt}
        />
      </div>
    );
  }
}
