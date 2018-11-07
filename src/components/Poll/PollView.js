import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { nextPoll, voteStore, finalSubmit } from "../../store/actions/";
import _ from "lodash";
import { isEmpty } from "../../utils/utilityFunctions";

class PollView extends Component {
  renderField(field) {
    let optionArray = [];
    let n = 0;
    _.map(this.props.login.committee.candidates, candidate => {
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
        this.props.login.committee.candidates.length -
        this.props.login.committee.seats -
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
      let newArray = [];
      if (values.pref) {
        for (let i = 0; i < values.pref.length; i++) {
          if (values.pref[i]) {
            newArray.push(values.pref[i]);
          }
        }
      }
      const batch = this.props.login.sid.slice(2, 6);
      const voteDetail = {
        comName: this.props.login.committee.comName,
        batch: batch,
        prefs: newArray
      };
      this.props.voteStore(voteDetail);
      this.props.nextPoll();
    } else {
      window.alert("Please select atleast one candidate");
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.login.submitMessage === "Vote Successfully Submitted") {
        localStorage.removeItem("TOKEN");
        this.props.logout();
      }
    }
  }

  voteSubmit() {
    const finalPacket = {
      sid: this.props.login.sid,
      voteList: this.props.login.vote
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
            <form onSubmit={handleSubmit(this.onSubmit)}>
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
      for (let j = i + 1; j < values.pref.length; j++) {
        if (values.pref[i] === values.pref[j]) {
          errors.pref = "Please do not repeat candidates";
          window.alert(errors.pref);
        }
      }
    }
    if (!values.pref[0]) {
      errors.pref =
        "Please select at least 1 Candidate for your first preference";
      window.alert(errors.pref);
    }
  }
  return errors;
}

function mapStateToProps(state) {
  return { login: state.login };
}

export default reduxForm({ validate, form: "votepoll" })(
  connect(
    mapStateToProps,
    { nextPoll, voteStore, finalSubmit }
  )(PollView)
);
