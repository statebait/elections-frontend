import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuth } from "../../store/actions";
import PollSideNav from "./PollNav";
import PollView from "./PollView";
import UserDetails from "./UserDetails";

class PollMain extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  logOut = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div style={{ display: "flex", columnGap: "40px" }}>
        <PollSideNav />
        <PollView logout={this.logOut} />
        <UserDetails sid={this.props.sid} name={this.props.name} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { sid: state.poll.sid, name: state.poll.name };
};

export default connect(
  mapStateToProps,
  {
    checkAuth
  }
)(PollMain);
