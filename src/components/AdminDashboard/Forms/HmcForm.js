import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { sendCommittee } from "../../../store/actions/index";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import Button from "../../UI/Button";
import { isAlpha } from "../../../utils/utilityFunctions";
import { batches } from "../../../data";

class HmcForm extends Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.message && this.state.loading) {
        this.setState({ loading: false });
        Alert.info(this.props.message);
      }
    }
  }

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
    this.setState({ loading: true });
    let temp = [];
    batches.map(item => {
      return temp.push(item.value);
    });
    const data = {
      comName: values.comName.toUpperCase(),
      seats: 1,
      batches: temp
    };
    this.props.sendCommittee(data, this.props.token);
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
          <Button
            text={"Submit"}
            type={"submit"}
            className="btn btn-primary"
            loading={this.state.loading}
          />
        </form>
        <br />
        <div>
          Please enter the floor in the follwing format: floor_letter/floor_no
          <br />
          For floor no: Ground - 1, Mid - 2, Top - 3
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.comName) {
    errors.comName = "Please enter a committee";
  }

  if (values.comName) {
    if (values.comName.length !== 3) {
      errors.comName = "Please enter a valid floor";
    }
    if (
      !isAlpha(values.comName[0]) ||
      values.comName[1] !== "/" ||
      isNaN(values.comName[2])
    ) {
      errors.comName = "Please enter a valid floor";
    }
  }

  return errors;
}

function mapStateToProps(state) {
  return { message: state.admin.committee.message, token: state.auth.token };
}

export default reduxForm({ validate, form: "HmcForm" })(
  connect(
    mapStateToProps,
    { sendCommittee }
  )(HmcForm)
);
