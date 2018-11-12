import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCandidates } from "../../../store/actions/index";

class CandidateList extends Component {
  componentDidMount() {
    this.props.fetchCandidates(this.props.token);
  }

  renderCandidates() {
    return _.map(this.props.candidates, candidate => {
      return (
        <tr key={candidate._id}>
          <td>{candidate.name}</td>
          <td>{candidate.sid}</td>
          <td>{candidate.comName}</td>
          <td>{candidate.cpi}</td>
          <td>
            <i
              onClick={() => {
                console.log("Test Delete");
              }}
              id="deletePopover"
              style={{ cursor: "pointer" }}
              className="fas fa-trash-alt"
            />
          </td>
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
              <th />
            </tr>
          </thead>
          <tbody>{this.renderCandidates()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { candidates: state.admin.candidate.list, token: state.auth.token };
}

export default connect(
  mapStateToProps,
  { fetchCandidates }
)(CandidateList);
