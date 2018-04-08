import React, { Component } from "react";
import { Field } from "redux-form";

class CommitteeSelect extends Component {
  renderSelect(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <select className="form-control" type="text" {...field.input}>
          <option value="">No Committee Selected</option>
          <option value="ACAD">Academic Committee</option>
          <option value="ICT">ICT Committee</option>
          <option value="HMC">Hostel Management Committee</option>
          <option value="SPC">Student Placement Cell</option>
          <option value="SYN">Annual Festival Committee</option>
          <option value="CMC">Cafeteria Management Committee</option>
          <option value="SPORT">Sports Committee</option>
          <option value="CULT">Cultural Committee</option>
        </select>
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  render() {
    return (
      <Field
        label="Committee Applied for"
        name="comName"
        type="text"
        component={this.renderSelect}
      />
    );
  }
}

export default CommitteeSelect;
