import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuth } from "../../store/actions";
import PollSideNav from "./PollNav";
import PollView from "./PollView";

class PollMain extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  logOut = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <PollSideNav />
        <PollView logout={this.logOut} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    checkAuth
  }
)(PollMain);
