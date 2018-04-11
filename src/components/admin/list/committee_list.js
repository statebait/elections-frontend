import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCommittees } from "../../../store/actions/index";

class CommitteeList extends Component {
  componentDidMount() {
    this.props.fetchCommittees();
  }

  renderCommittees() {
    return _.map(this.props.admin, committee => {
      return (
        <tr key={committee._id}>
          <td>{committee.comName}</td>
          <td>{committee.batch}</td>
          <td>
            {_.map(committee.candidates, candidates => {
              return `${candidates.name}, `;
            })}
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
              <th>Batch</th>
              <th>Candidates</th>
            </tr>
          </thead>
          <tbody>{this.renderCommittees()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default connect(mapStateToProps, { fetchCommittees })(CommitteeList);
