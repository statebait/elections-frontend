import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Button from "../../UI/Button";
import { fetchCommittees, deleteCommittee } from "../../../store/actions/index";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class CommitteeList extends Component {
  state = {
    modalIsOpen: false,
    deleteID: ""
  };

  componentDidMount() {
    this.props.fetchCommittees(this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.message.includes("Deleted Committee")) {
        this.props.fetchCommittees(this.props.token);
      }
    }
  }

  modalOpen = id => {
    this.setState({ modalIsOpen: true, deleteID: id });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleDelete = id => {
    this.props.deleteCommittee(id, this.props.token);
    this.setState({ modalIsOpen: false, deleteID: "" });
  };

  renderCommittees() {
    if (this.props.committees) {
      return _.map(this.props.committees, committee => {
        return (
          <tr key={committee._id}>
            <td>{committee.comName}</td>
            <td>
              {_.map(committee.batches, batch => {
                return `${batch}, `;
              })}
            </td>
            <td>
              {_.map(committee.candidates, candidates => {
                return `${candidates.name}, `;
              })}
            </td>
            <td>
              <i
                onClick={() => {
                  this.modalOpen(committee._id);
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
  }

  render() {
    return (
      <div className="admin_table">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <p>Are you sure?</p>
          <Button
            loading={this.props.loading}
            className="btn btn-danger righted"
            text="Confirm"
            color="black"
            onClick={() => {
              this.handleDelete(this.state.deleteID);
            }}
            curved
          />
          <Button
            loading={this.props.loading}
            className="btn"
            text="Cancel"
            color="black"
            onClick={this.closeModal}
            curved
          />
        </Modal>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Candidates</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderCommittees()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    committees: state.admin.committee.list,
    token: state.auth.token,
    message: state.admin.committee.message
  };
}

export default connect(
  mapStateToProps,
  { fetchCommittees, deleteCommittee }
)(CommitteeList);
