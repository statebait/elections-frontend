import React, { Component } from "react";
import { Field } from "redux-form";
import Select from "react-select";
import { batches } from "../../../data";

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
