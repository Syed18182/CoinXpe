import React, { Component } from "react";
import Dashboard from "./Dashboard";
import AdminDash from "./AdminDash";
import Logindash from "./Logindash";

function ChangingScreen(props) {
  if (props.screen === 1) {
    return <Logindash changeScreen={props.changeScreen} />;
  } else if (props.screen === 2) {
    return (
      <Dashboard changeScreen={props.changeScreen} userdata={props.userdata} />
    );
  } else if (props.screen === 3) {
    return <AdminDash changeScreen={props.changeScreen} />;
  }
  return <></>;
}
export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
      userdata: [],
    };
    this.changeScreen = this.changeScreen.bind(this);
  }

  changeScreen = (screenNo, udata) => {
    this.setState({ screen: screenNo, userdata: udata });
  };

  render() {
    return (
      <div>
        <ChangingScreen
          screen={this.state.screen}
          changeScreen={this.changeScreen}
          userdata={this.state.userdata}
        />
      </div>
    );
  }
}
