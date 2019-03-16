import React, { Component } from "react";
import _ from "lodash";
import Button from "../../UI/Button";
import { connect } from "react-redux";
import { fetchCandidates, deleteCandidate } from "../../../store/actions/index";
import Modal from "react-modal";

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

class CandidateList extends Component {
  state = {
    modalIsOpen: false,
    deleteID: ""
  };

  componentDidMount() {
    this.props.fetchCandidates(this.props.token);
  }

  componentDidUpdate(prevProps) {
    // if (this.props !== prevProps) {
    //   if (this.props.message.includes("Successfully deleted Candidate")) {
    //     this.props.fetchCandidates(this.props.token);
    //   }
    // }
  }

  handleDelete = id => {
    this.setState({ deleteID: "", modalIsOpen: false });
    this.props.deleteCandidate(id, this.props.token);
  };

  modalOpen = id => {
    this.setState({ deleteID: id, modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

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
                this.modalOpen(candidate._id);
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <p>Are you sure?</p>
          <Button
            className="btn btn-danger righted"
            text="Confirm"
            color="black"
            onClick={() => {
              this.handleDelete(this.state.deleteID);
            }}
            curved
          />
          <Button
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
  return {
    candidates: state.admin.candidate.list,
    token: state.auth.token,
    message: state.admin.candidate.message
  };
}

export default connect(
  mapStateToProps,
  { fetchCandidates, deleteCandidate }
)(CandidateList);
