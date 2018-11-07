import React, { Component } from "react";
import { Field } from "redux-form";
import Select from "react-select";

const batches = [
  { value: 1701, label: "BTech 2017" },
  { value: 1601, label: "BTech 2016" },
  { value: 1501, label: "BTech 2015" },
  { value: 1711, label: "MTech 2017" },
  { value: 1712, label: "MscIT/Mdes 2017" },
  { value: 1711, label: "PHD 2017" }
];

class CommitteeBatchSelect extends Component {
  renderSelect(field) {
    const {
      meta: { touched, error }
    } = field;

    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <Select
          name={field.input.name}
          value={field.input.value}
          options={batches}
          isMulti
          className="batch-select"
          onChange={value => field.input.onChange(value)}
          onBlur={() => field.input.onBlur(field.input.value)}
          onFocus={value => field.input.onFocus(value)}
        />
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  }

  render() {
    return <Field label="Batch" name="batches" component={this.renderSelect} />;
  }
}

export default CommitteeBatchSelect;
