import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import CommitteeSelect from "../select/comm_select";
import BatchSelect from "../select/batch_select";
import { sendCandidate } from "../../../store/actions/index";
import { connect } from "react-redux";

class CandidateForm extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <input
          placeholder={`Enter ${field.label}`}
          className="form-control"
          {...field.input}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.sendCandidate(values, this.props.admin.token);
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="admin_main_display">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Candidate Name"
            name="name"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Student ID"
            name="sid"
            type="number"
            component={this.renderField}
          />
          <BatchSelect />
          <CommitteeSelect />
          <Field
            label="HMC Floor"
            name="comName"
            type="name"
            component={this.renderField}
          />
          <Field
            label="CPI"
            name="cpi"
            type="number"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Please enter a name";
  }

  if (!values.sid) {
    errors.sid = "Please enter a Student ID";
  } else if (isNaN(values.sid) || values.sid.toString().length !== 9) {
    errors.sid = "Please enter a valid Student ID";
  }

  if (!values.comName) {
    errors.comName = "Please select a committee";
  }

  if (!values.batch) {
    errors.batch = "Please select a batch";
  }

  if (!values.cpi) {
    errors.cpi = "Please enter a CPI";
  } else if (isNaN(values.cpi) || values.cpi > 10) {
    errors.cpi = "Please enter a valid CPI";
  }

  return errors;
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default reduxForm({ validate, form: "candForm" })(
  connect(mapStateToProps, { sendCandidate })(CandidateForm)
);
