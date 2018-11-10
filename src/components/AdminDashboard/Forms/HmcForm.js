import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { sendCommittee } from "../../../store/actions/index";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import Button from "../../UI/Button";

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
    const data = { comName: values.comName, seats: 1, batch: "0000" };
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
            styleClass="btn btn-primary"
            loading={this.state.loading}
          />
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
  return { message: state.admin.committee.message, token: state.auth.token };
}

export default reduxForm({ validate, form: "HmcForm" })(
  connect(
    mapStateToProps,
    { sendCommittee }
  )(HmcForm)
);
