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
          <option value="1611">MTech 2016</option>
          <option value="1712">MSc.IT 2017</option>
          <option value="1612">MSc.IT 2016</option>
          <option value="1714">MDes 2017</option>
          <option value="1614">MDes 2016</option>
          <option value="1613">MSc(ICT-ARD) 2016</option>
          <option value="0021">PHD</option>
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
        type="number"
        component={this.renderSelect}
      />
    );
  }
}

export default BatchSelect;
