import React, { Component } from "react";

import PollSideNav from "./PollNav";
import PollView from "./PollView";

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
