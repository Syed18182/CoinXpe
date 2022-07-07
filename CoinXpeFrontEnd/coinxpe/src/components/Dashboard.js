import React, { Component } from "react";
import BottomNavBar from "./BottomNavBar";
import Home from "./Home";
import Wallet from "./Wallet";
import News from "./News";
import Settings from "./Settings";
import MarketSelect from "./MarketSelect";

function ChangingScreen(props) {
  if (props.screen === 1) {
    return <Home />;
  } else if (props.screen === 2) {
    return <MarketSelect userdata={props.userdata} />;
  } else if (props.screen === 3) {
    return <Wallet userdata={props.userdata} />;
  } else if (props.screen === 4) {
    return <News />;
  } else if (props.screen === 5) {
    return <Settings userdata={props.userdata} />;
  }
  return <></>;
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
    };
    this.changeScreenD = this.changeScreenD.bind(this);
  }

  changeScreenD = (screenNo) => {
    this.setState({ screen: screenNo });
  };

  render() {
    return (
      <div>
        <ChangingScreen
          screen={this.state.screen}
          userdata={this.props.userdata}
        />
        <BottomNavBar changeScreenD={this.changeScreenD} />
      </div>
    );
  }
}
