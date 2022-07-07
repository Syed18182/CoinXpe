import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgetPwd from "./ForgetPwd";

function ChangingScreen(props) {
  if (props.screen === 1) {
    return (
      <Login
        changeScreenL={props.changeScreenL}
        changeScreen={props.changeScreen}
      />
    );
  } else if (props.screen === 2) {
    return <Register changeScreenL={props.changeScreenL} />;
  } else if (props.screen === 3) {
    return <ForgetPwd changeScreenL={props.changeScreenL} />;
  }
  return <></>;
}

export default class Logindash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
    };
    this.changeScreenL = this.changeScreenL.bind(this);
  }

  changeScreenL = (screenNo) => {
    this.setState({ screen: screenNo });
  };

  render() {
    return (
      <div>
        <ChangingScreen
          screen={this.state.screen}
          changeScreenL={this.changeScreenL}
          changeScreen={this.props.changeScreen}
        />
      </div>
    );
  }
}
