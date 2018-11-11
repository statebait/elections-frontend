import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

class PollSideNav extends Component {
  renderNavItems() {
    return _.map(this.props.allCommittees, committee => {
      if (committee._id === this.props.currentCommittee._id) {
        return (
          <li
            className="nav-item committee_names active-nav-item"
            key={committee._id}
          >
            {committee.comName}
          </li>
        );
      } else {
        return (
          <li className="nav-item committee_names" key={committee._id}>
            {committee.comName}
          </li>
        );
      }
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
  return {
    allCommittees: state.poll.allCommittees,
    currentCommittee: state.poll.currentCommittee
  };
}

export default connect(mapStateToProps)(PollSideNav);
