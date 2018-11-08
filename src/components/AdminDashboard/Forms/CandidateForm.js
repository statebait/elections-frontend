import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import CommitteeSelect from "../SelectOptions/CommitteeSelect";
import CandidateBatchSelect from "../SelectOptions/CandidateBatchSelect";
import Alert from "react-s-alert";
import { sendCandidate } from "../../../store/actions/index";
import { connect } from "react-redux";
import Button from "../../UI/Button";

class CandidateForm extends Component {
  state = { loading: false };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <input
          style={{ width: 500 }}
          placeholder={`Enter ${field.label}`}
          className="form-control"
          {...field.input}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.admin.message && this.state.loading) {
        this.setState({ loading: false });
        Alert.info(this.props.admin.message);
      }
    }
  }

  onSubmit(values) {
    this.setState({ loading: true });
    let finalValues;
    let token = localStorage.getItem("TOKEN");
    if (values.hmcFloor) {
      finalValues = {
        ...values,
        comName: values.hmcFloor
      };
    } else {
      finalValues = {
        ...values
      };
    }
    this.props.sendCandidate(finalValues, token);
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
          <CandidateBatchSelect />
          <CommitteeSelect />
          <Field
            label="HMC Floor"
            name="hmcFloor"
            type="name"
            component={this.renderField}
          />
          <Field
            label="CPI"
            name="cpi"
            type="number"
            component={this.renderField}
          />
          <Button
            loading={this.state.loading}
            text={"Submit"}
            type={"submit"}
            styleClass="btn btn-primary"
          />
        </form>
        <br />
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
  connect(
    mapStateToProps,
    { sendCandidate }
  )(CandidateForm)
);
