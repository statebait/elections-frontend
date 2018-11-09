import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCandidates } from "../../../store/actions/index";

class CandidateList extends Component {
  componentDidMount() {
    let token = localStorage.getItem("TOKEN");
    this.props.fetchCandidates(token);
  }

  renderCandidates() {
    return _.map(this.props.admin, candidate => {
      return (
        <tr key={candidate._id}>
          <td>{candidate.name}</td>
          <td>{candidate.sid}</td>
          <td>{candidate.comName}</td>
          <td>{candidate.cpi}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="admin_table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Committee</th>
              <th>CPI</th>
            </tr>
          </thead>
          <tbody>{this.renderCandidates()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default connect(
  mapStateToProps,
  { fetchCandidates }
)(CandidateList);
