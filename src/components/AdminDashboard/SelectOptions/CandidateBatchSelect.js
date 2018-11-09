import React, { Component } from "react";
import { Field } from "redux-form";
import { batches } from "../../../data";

class CandidateBatchSelect extends Component {
  renderSelect(field) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <select
          className="form-control"
          style={{ width: 500 }}
          type="text"
          {...field.input}
        >
          <option value="">No Batch Selected</option>
          {batches.map(item => {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  render() {
    return (
      <Field
        label="Batch"
        name="batch"
        type="string"
        component={this.renderSelect}
      />
    );
  }
}

export default CandidateBatchSelect;
