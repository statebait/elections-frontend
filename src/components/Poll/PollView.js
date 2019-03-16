import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import Button from "../UI/Button";
import {
  voteStore,
  finalSubmit,
  goBack,
  logOut,
  storeError
} from "../../store/actions/";
import { store } from "../../store";
import { isEmpty, useMap } from "../../utils/utilityFunctions";
import { committeeMapDetailed } from "../../data";

class PollView extends React.Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.poll.submitMessage === "Vote Successfully Submitted") {
        this.setState({ loading: false });
        window.alert(this.props.poll.submitMessage);
        this.props.logOut();
      }
    }
  }

  renderField(field) {
    const currentCommittee = this.props.poll.currentCommittee;
    let optionArray = [];
    let n = 0;
    _.map(currentCommittee.candidates, candidate => {
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
    const currentCommittee = this.props.poll.currentCommittee;
    let prefArray = [],
      prefs = currentCommittee.candidates.length - currentCommittee.seats - 1;
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
    const currentCommittee = this.props.poll.currentCommittee;
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
        comName: currentCommittee.comName,
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

  goBack = () => {
    this.props.goBack();
  };

  render() {
    const { handleSubmit } = this.props;
    const currentCommittee = this.props.poll.currentCommittee;
    if (this.props.poll.finalState === true) {
      return (
        <div className="submit_vote">
          <button
            className="btn btn-outline-dark btn-lg"
            style={{ marginRight: 10 }}
            onClick={this.goBack}
            type="button"
          >
            Back
          </button>
          <Button
            loading={this.state.loading}
            color="#343A40"
            text="Submit Vote"
            className="btn btn-outline-dark btn-lg"
            onClick={this.voteSubmit.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="jumbotron">
            <h1 className="display-4">
              {useMap
                ? committeeMapDetailed[currentCommittee.comName]
                : currentCommittee.comName}
            </h1>
          </div>
          <div className="poll_candidate">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {_.get(currentCommittee, "candidates") && this.renderFields()}
              <div style={{ color: "red" }}>
                {this.props.poll.validationError}
              </div>
              <div className="btn_placement">
                <button
                  className="btn btn-outline-dark btn-lg"
                  style={{ marginRight: 10 }}
                  onClick={this.goBack}
                  type="button"
                  disabled={this.props.poll.disableBack}
                >
                  Back
                </button>
                <button className="btn btn-outline-dark btn-lg" type="submit">
                  Next
                </button>
              </div>
            </form>
            <br />
            <br />
            <div>
              <p>
                Note: You are obliged to give atleast 1 preference of candidate
                for each committee.
              </p>
            </div>
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
  return {
    poll: state.poll,
    token: state.auth.token
  };
}

export default reduxForm({ validate, form: "votepoll" })(
  connect(
    mapStateToProps,
    { voteStore, finalSubmit, logOut, storeError, goBack }
  )(PollView)
);
