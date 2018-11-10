import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { logIn, checkAuth } from "../../store/actions/index";
import Button from "../UI/Button";

const HeadStyle = {
  paddingTop: "80px",
  fontSize: "80px",
  color: "#343a40"
};

class LoginPage extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          style={{ borderRadius: 20 }}
          placeholder={`Enter ${field.label}`}
          id={`${field.type}_input_style`}
          type={field.type}
          {...field.input}
        />
        <div className="helper_text_login">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.logIn(values);
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/poll" />;
      }
    } else {
      return (
        <div className="login-wrapper">
          <div style={HeadStyle}>
            <p>DA-IICT Elections</p>
          </div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div>
              <Field
                name="sid"
                label="Student ID:"
                type="number"
                component={this.renderField}
              />
              <Field
                name="pwd"
                label="Password:"
                type="password"
                component={this.renderField}
              />
            </div>
            <div className="helper_text_login">{this.props.error}</div>
            <Button
              type="submit"
              styleClass="btn btn-outline-dark login-button"
              loading={this.props.loading}
              text="Log In"
              color="#343A40"
            />
          </form>
        </div>
      );
    }
  }
}

function validate(values) {
  const errors = {};

  //Validation for the Student ID
  if (!values.sid) {
    errors.sid = "Please enter a Student ID";
  } else if (isNaN(values.sid) || values.sid.toString().length !== 9) {
    errors.sid = "Please enter a valid Student ID";
  }

  //Validation for the Password
  if (!values.pwd) {
    errors.pwd = "Please enter a password";
  } else if (values.pwd.length !== 10) {
    errors.pwd = "Please enter a valid password";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    message: state.auth.message,
    error: state.auth.error.message
  };
}

export default reduxForm({ validate, form: "login" })(
  connect(
    mapStateToProps,
    { logIn, checkAuth }
  )(LoginPage)
);
