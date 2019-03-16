import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import CommitteeSelect from "../SelectOptions/CommitteeSelect";
import CandidateBatchSelect from "../SelectOptions/CandidateBatchSelect";
import Alert from "react-s-alert";
import { sendCandidate } from "../../../store/actions/index";
import { connect } from "react-redux";
import Button from "../../UI/Button";
import { isAlpha } from "../../../utils/utilityFunctions";

class CandidateForm extends React.Component {
  state = { loading: false, hmcField: <React.Fragment />, hmc: false };

  componentDidMount() {
    this.props.dispatch(reset("candForm"));
  }

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

  onSubmit(values) {
    this.setState({ loading: true });
    let finalValues;
    if (this.state.hmc) {
      finalValues = {
        name: values.name,
        sid: values.sid,
        batch: values.batch,
        comName: values.hmcFloor
      };
    } else {
      finalValues = {
        name: values.name,
        sid: values.sid,
        batch: values.batch,
        comName: values.comName
      };
    }
    this.props.sendCandidate(finalValues, this.props.token);
  }

  hmcDynamic = value => {
    if (value === "HMC") {
      this.setState({
        hmcField: (
          <Field
            label="HMC Floor"
            name="hmcFloor"
            type="name"
            component={this.renderField}
          />
        ),
        hmc: true
      });
    } else {
      this.setState({ hmcField: <React.Fragment />, hmc: false });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const hmcField = this.state.hmcField;
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
          <CommitteeSelect
            onChange={value => {
              this.hmcDynamic(value);
            }}
          />
          {hmcField}
          <Button
            loading={this.state.loading}
            text={"Submit"}
            type={"submit"}
            className="btn btn-primary"
          />
        </form>
        <br />
        <div>
          Please enter the floor in the follwing format: floor_letter//floor_no
          <br />
          For floor no: Ground - 1, Mid - 2, Top - 3
        </div>
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

  if (values.comName === "HMC" && values.hmcFloor) {
    if (values.hmcFloor.length !== 4)
      errors.hmcFloor = "Please enter a valid floor";
    if (
      !isAlpha(values.hmcFloor[0]) ||
      values.hmcFloor[1] !== "//" ||
      isNaN(values.hmcFloor[2])
    ) {
      errors.hmcFloor = "Please enter a valid floor";
    }
  }

  return errors;
}

function mapStateToProps(state) {
  return { message: state.admin.candidate.message, token: state.auth.token };
}

export default reduxForm({ validate, form: "candForm" })(
  connect(
    mapStateToProps,
    { sendCandidate }
  )(CandidateForm)
);
