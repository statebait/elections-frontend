import React, { Component } from "react";

import PollSideNav from "./poll_nav";
import PollView from "./poll_view";

class PollMain extends Component {
  render() {
    return (
      <div>
        <PollSideNav />
        <PollView />
      </div>
    );
  }
}

export default PollMain;
