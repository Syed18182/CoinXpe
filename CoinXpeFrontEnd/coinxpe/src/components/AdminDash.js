import React, { Component } from "react";
import NavBar from "./NavBar";
import Usertable from "./Usertable";
import UpdateUserTable from "./UpdateUserTable";
import axios from "axios";
import DelUserTable from "./DelUserTable";
import RestoreUser from "./RestoreUser";

function ChangingScreen(props) {
  if (props.screen === 1) {
    return (
      <Usertable
        value={props.value}
        data={props.SearchedData}
        SearchedData={props.data}
        updateData={props.updateData}
      />
    );
  } else if (props.screen === 2) {
    return (
      <UpdateUserTable
        value={props.value}
        data={props.SearchedData}
        SearchedData={props.data}
        updateData={props.updateData}
        updateMainData={props.updateMainData}
      />
    );
  } else if (props.screen === 3) {
    return (
      <DelUserTable
        value={props.value}
        data={props.SearchedData}
        SearchedData={props.data}
        updateData={props.updateData}
        updateMainData={props.updateMainData}
        updateDelData={props.updateDelData}
        updateDelMainData={props.updateDelMainData}
      />
    );
  } else if (props.screen === 4) {
    return (
      <RestoreUser
        value={props.value}
        data={props.deldata}
        SearchedData={props.delMaindata}
        updatethatData={props.updateData}
        updatethatMainData={props.updateMainData}
        updateData={props.updateDelData}
        updateMainData={props.updateDelMainData}
      />
    );
  }
  return <></>;
}

export default class AdminDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      screen: 1,
      data: [],
      deldata: [],
      delMaindata: [],
      SearchedData: [],
    };
    this.changeScreen = this.changeScreen.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateToggle = this.updateToggle.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/getAllUsers").then(async (res) => {
      this.setState({
        data: await res["data"],
        SearchedData: await res["data"],
      });
    });
    axios.get("http://localhost:8000/getAllDelUsers").then(async (res) => {
      this.setState({
        deldata: await res["data"],
        delMaindata: await res["data"],
      });
    });
  }

  updateToggle = (togglevalue) => {
    this.setState({ value: togglevalue });
  };

  changeScreen = async (screenNo) => {
    this.setState({ screen: screenNo });
  };

  updateData = async (updatedInfo) => {
    this.setState({ SearchedData: await updatedInfo });
  };

  updateMainData = async (updatedInfo) => {
    this.setState({ data: await updatedInfo });
  };

  updateDelData = async (updatedInfo) => {
    this.setState({ deldata: await updatedInfo });
  };

  updateDelMainData = async (updatedInfo) => {
    this.setState({ delMaindata: await updatedInfo });
  };

  render() {
    return (
      <div>
        <NavBar
          updateToggle={this.updateToggle}
          value={this.state.value}
          changeScreen={this.changeScreen}
          updateScreen={this.props.updateScreen}
          data={this.state.data}
          SearchedData={this.state.SearchedData}
          updateData={this.updateData}
        />
        <ChangingScreen
          screen={this.state.screen}
          value={this.state.value}
          data={this.state.SearchedData}
          SearchedData={this.state.data}
          updateData={this.updateData}
          updateMainData={this.updateMainData}
          delMaindata={this.state.delMaindata}
          deldata={this.state.deldata}
          updateDelData={this.updateDelData}
          updateDelMainData={this.updateDelMainData}
        />
      </div>
    );
  }
}
