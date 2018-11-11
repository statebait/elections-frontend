import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  voteStore,
  finalSubmit,
  logOut,
  storeError
} from "../../store/actions/";
import _ from "lodash";
import { isEmpty } from "../../utils/utilityFunctions";
import Button from "../UI/Button";
import { store } from "../../store";

class PollView extends Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log(this.props.poll.validationError);

      if (this.props.poll.submitMessage === "Vote Successfully Submitted") {
        this.setState({ loading: false });
        window.alert(this.props.poll.submitMessage);
        this.props.logOut();
      }
    }
  }

  renderField(field) {
    let optionArray = [];
    let n = 0;
    _.map(this.props.poll.currentCommittee.candidates, candidate => {
      n++;
      optionArray.push(
        <option key={n} value={`${candidate.sid}`}>
          {candidate.name}
        </option>
      );
    });

    return (
      <div className="form-group">
        <div className="input-group candidate_wrap">
          <div className="input-group-prepend">
            <span className="input-group-text">{field.label}</span>
          </div>
          <select className="form-control select_style" {...field.input}>
            <option value="">None</option>
            {optionArray}
          </select>
        </div>
      </div>
    );
  }

  renderFields = () => {
    let prefArray = [],
      prefs =
        this.props.poll.currentCommittee.candidates.length -
        this.props.poll.currentCommittee.seats -
        1;
    if (prefs >= 6) {
      prefs = 6;
    } else if (prefs <= 2) {
      prefs = 2;
    }
    for (let i = 0; i < prefs; i++) {
      prefArray.push(
        <Field
          name={`pref.${i}`}
          label={`Preference - ${i + 1}`}
          component={this.renderField.bind(this)}
          key={i}
        />
      );
    }
    return <div>{prefArray}</div>;
  };

  onSubmit = values => {
    if (!isEmpty(values)) {
      this.props.storeError("");
      let newArray = [];
      if (values.pref) {
        for (let i = 0; i < values.pref.length; i++) {
          if (values.pref[i]) {
            newArray.push(values.pref[i]);
          }
        }
      }
      const batch = this.props.poll.sid.slice(2, 6);
      const voteDetail = {
        comName: this.props.poll.currentCommittee.comName,
        batch: batch,
        prefs: newArray
      };
      this.props.voteStore(voteDetail);
    } else {
      this.props.storeError("Please select atleast 1 candidate.");
    }
  };

  voteSubmit() {
    this.setState({ loading: true });
    const finalPacket = {
      sid: this.props.poll.sid,
      voteList: this.props.poll.vote
    };
    this.props.finalSubmit(finalPacket, this.props.token);
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.poll.finalState === true) {
      return (
        <div className="submit_vote">
          <Button
            loading={this.state.loading}
            color="#343A40"
            text="Submit Vote"
            styleClass="btn btn-outline-dark btn-lg"
            onClick={this.voteSubmit.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="jumbotron">
            <h1 className="display-4">
              {this.props.poll.currentCommittee.comName}
            </h1>
          </div>
          <div className="poll_candidate">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {_.get(this.props.poll.currentCommittee, "candidates") &&
                this.renderFields()}
              <div style={{ color: "red" }}>
                {this.props.poll.validationError}
              </div>
              <div className="btn_placement">
                <button className="btn btn-outline-dark btn-lg">Next</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

function validate(values) {
  const errors = {};
  if (values.pref) {
    for (let i = 0; i < values.pref.length; i++) {
      for (let j = i + 1; j < values.pref.length; j++) {
        if (values.pref[i] === values.pref[j]) {
          errors.pref = "Please do not repeat candidates";
          store.dispatch(storeError(errors.pref));
        } else {
          errors.pref = "";
          store.dispatch(storeError(errors.pref));
        }
      }
    }
    if (!values.pref[0]) {
      errors.pref =
        "Please select at least 1 Candidate for your first preference";
      store.dispatch(storeError(errors.pref));
    } else {
      store.dispatch(storeError(errors.pref));
    }
  }
  return errors;
}

function mapStateToProps(state) {
  return { poll: state.poll, token: state.auth.token };
}

export default reduxForm({ validate, form: "votepoll" })(
  connect(
    mapStateToProps,
    { voteStore, finalSubmit, logOut, storeError }
  )(PollView)
);
