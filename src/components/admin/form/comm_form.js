import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import CommitteeSelect from "../select/comm_select";
import BatchSelect from "../select/batch_select";
import { sendCommittee } from "../../../store/actions/index";
import { connect } from "react-redux";

class CommitteeForm extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          placeholder={`Enter ${field.label}`}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.sendCommittee(values);
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="admin_main_display">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <CommitteeSelect />
          <BatchSelect />
          <Field
            label="Seats:"
            name="seats"
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

  if (!values.comName) {
    errors.comName = "Please select a committee";
  }

  if (!values.batch) {
    errors.batch = "Please select a batch";
  }

  if (!values.seats) {
    errors.seats = "Please enter the no. of seats";
  } else if (isNaN(values.seats) || values.seats <= 0) {
    errors.seats = "Please enter a valid no. of seats";
  }

  return errors;
}

export default reduxForm({ validate, form: "commForm" })(
  connect(null, { sendCommittee })(CommitteeForm)
);
