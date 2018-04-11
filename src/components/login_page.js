import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAuth } from "../store/actions/index";

const HeadStyle = {
  paddingTop: "80px",
  fontSize: "80px",
  color: "#343a40"
};

class LoginPage extends Component {
  componentWillReceiveProps() {
    if (this.props.login.page === "poll") {
      this.props.history.push("/poll");
    } else if (this.props.login.page === "admin") {
      this.props.history.push("/admin");
    }
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          placeholder={`Enter ${field.label}`}
          id={`${field.type}_input_style`}
          type={field.type}
          {...field.input}
        />
        <div
          className="helper_text_login
        "
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.loginAuth(values);
  }

  render() {
    const { handleSubmit } = this.props;
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
          <button type="submit" className="btn btn-outline-dark">
            Login
          </button>
          <Link to="/admin/" className="btn btn-outline-dark">
            Admin
          </Link>
        </form>
        <div className="helper_text_login_error">
          {this.props.login.message}
        </div>
      </div>
    );
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
  return { login: state.login };
}

export default reduxForm({ validate, form: "login" })(
  connect(mapStateToProps, { loginAuth })(LoginPage)
);
