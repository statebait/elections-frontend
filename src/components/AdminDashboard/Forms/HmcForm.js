import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { sendCommittee } from "../../../store/actions/index";
import { connect } from "react-redux";

class HmcForm extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          placeholder={`Enter ${field.label}`}
          className="form-control"
          style={{ width: 500 }}
          type="text"
          {...field.input}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    const data = { comName: values.comName, seats: 1, batch: "0000" };
    this.props.sendCommittee(data, this.props.admin.token);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="admin_main_display">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Floor:"
            name="comName"
            type="name"
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
    errors.comName = "Please enter a committee";
  }

  return errors;
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default reduxForm({ validate, form: "HmcForm" })(
  connect(
    mapStateToProps,
    { sendCommittee }
  )(HmcForm)
);
