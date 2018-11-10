import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

class PollSideNav extends Component {
  renderNavItems() {
    return _.map(this.props.poll.allCommittees, comName => {
      return (
        <li className="nav-item committee_names" key={comName._id}>
          {comName.comName}
        </li>
      );
    });
  }

  render() {
    return (
      <nav className="col-md-2 d-none d-md-block sidebar-vote nav-shadow">
        <ul className="nav flex-column">{this.renderNavItems()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { poll: state.poll };
}

export default connect(mapStateToProps)(PollSideNav);
