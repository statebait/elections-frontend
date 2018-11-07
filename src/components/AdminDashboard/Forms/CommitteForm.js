import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import CommitteeSelect from "../SelectOptions/CommitteeSelect";
import CommitteeBatchSelect from "../SelectOptions/CommitteeBatchSelect";
import { sendCommittee } from "../../../store/actions/index";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Alert from "react-s-alert";

class CommitteeForm extends Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.admin.message) {
        this.setState({ loading: false });
        Alert.success(this.props.admin.message);
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
          style={{ width: 500 }}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  async onSubmit(values) {
    let token = localStorage.getItem("TOKEN");
    let temp = [];
    this.setState({ loading: true });
    await values.batches.map(item => {
      return temp.push(item.value);
    });
    const finalValues = {
      comName: values.comName,
      batches: temp,
      seats: values.seats
    };
    this.props.sendCommittee(finalValues, token);
  }

  render() {
    const { handleSubmit } = this.props;
    let loading = "Submit";
    if (this.state.loading) {
      loading = (
        <ReactLoading
          type={"bars"}
          color={"white"}
          height={"30px"}
          width={"30px"}
        />
      );
    }

    return (
      <div className="admin_main_display">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <CommitteeSelect />
          <CommitteeBatchSelect />
          <Field
            label="Seats:"
            name="seats"
            type="number"
            component={this.renderField}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.loading}
          >
            {loading}
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

  if (!values.batches) {
    errors.batches = "Please select a batch";
  }

  if (!values.seats) {
    errors.seats = "Please enter the no. of seats";
  } else if (isNaN(values.seats) || values.seats <= 0) {
    errors.seats = "Please enter a valid no. of seats";
  }

  return errors;
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default reduxForm({ validate, form: "commForm" })(
  connect(
    mapStateToProps,
    { sendCommittee }
  )(CommitteeForm)
);
