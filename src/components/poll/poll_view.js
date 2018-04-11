import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { nextPoll, voteStore, finalSubmit } from "../../store/actions/index";
import _ from "lodash";

class PollView extends Component {
  renderField(field) {
    let optionArray = [];
    _.map(this.props.login.committee.candidates, candidate => {
      optionArray.push(
        <option value={`${candidate.sid}`}>{candidate.name}</option>
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
        this.props.login.committee.candidates.length -
        this.props.login.committee.seats -
        1;
    if (prefs >= 6) {
      prefs = 6;
    } else if (prefs <= 2) {
      prefs = 2;
    }
    for (let i = 0; i < prefs; i++) {
      if (i === 0) {
        prefArray.push(
          <Field
            name={`pref.${i}`}
            label={`1st Preference`}
            component={this.renderField.bind(this)}
            key={i}
          />
        );
      } else if (i === 1) {
        prefArray.push(
          <Field
            name={`pref.${i}`}
            label={`2nd Preference`}
            component={this.renderField.bind(this)}
            key={i}
          />
        );
      } else if (i === 2) {
        prefArray.push(
          <Field
            name={`pref.${i}`}
            label={`3rd Preference`}
            component={this.renderField.bind(this)}
            key={i}
          />
        );
      } else {
        prefArray.push(
          <Field
            name={`pref.${i}`}
            label={`${i + 1}th Preference`}
            component={this.renderField.bind(this)}
            key={i}
          />
        );
      }
    }
    return <div>{prefArray}</div>;
  };

  onSubmit(values) {
    let newArray = [];
    if (values.pref) {
      for (let i = 0; i < values.pref.length; i++) {
        if (values.pref[i]) {
          newArray.push(values.pref[i]);
        }
      }
    }
    const voteDetail = {
      comName: this.props.login.committee.comName,
      batch: this.props.login.committee.batch,
      prefs: newArray
    };
    console.log(newArray);
    this.props.voteStore(voteDetail);
    console.log(voteDetail);
    this.props.nextPoll();
  }

  voteSubmit() {
    const finalPacket = {
      sid: this.props.login.sid,
      vote: this.props.login.vote
    };
    this.props.finalSubmit(finalPacket, this.props.login.token);
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.login.finalState === true) {
      return (
        <div className="submit_vote">
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={this.voteSubmit.bind(this)}
          >
            Submit Vote
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="jumbotron">
            <h1 className="display-4">{this.props.login.committee.comName}</h1>
          </div>
          <div className="poll_candidate">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              {_.get(this.props.login.committee, "candidates") &&
                this.renderFields()}
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
      for (let j = 1; j < values.pref.length; j++) {
        if (values.pref[i] === values.pref[j]) {
          errors.pref = "Please do not repeat candidates";
        }
      }
    }
    if (!values.pref[0]) {
      errors.pref =
        "Please select at least 1 Candidate for your first preference";
    }
  }

  // if (!values.pref) {
  //    errors.pref = "Please select at least 1 Candidate";
  //  }
  //  if (!values.pref)

  return errors;
}

function mapStateToProps(state) {
  return { login: state.login };
}

export default reduxForm({ validate, form: "votepoll" })(
  connect(mapStateToProps, { nextPoll, voteStore, finalSubmit })(PollView)
);
