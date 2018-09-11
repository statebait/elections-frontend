import React, { Component } from "react";
import { Field } from "redux-form";

class BatchSelect extends Component {
  renderSelect(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <select className="form-control" type="text" {...field.input}>
          <option value="">No Batch Selected</option>
          <option value="1701">BTech 2017</option>
          <option value="1601">BTech 2016</option>
          <option value="1501">BTech 2015</option>
          <option value="1711">MTech 2017</option>
          <option value="1712">MSc.IT 2017</option>
          <option value="1712">MDes 2017</option>
          <option value="1711">PHD</option>
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

export default BatchSelect;
