import React, { Component } from "react";
import Alert from "react-s-alert";
import PollSideNav from "./PollNav";
import PollView from "./PollView";

class PollMain extends Component {
  logOut = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <PollSideNav />
        <PollView logout={this.logOut} />
        <Alert stack={{ limit: 3 }} position="top-right" />
      </div>
    );
  }
}

export default PollMain;
