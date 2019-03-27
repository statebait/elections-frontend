import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { committees } from "../../../data";

class CommitteeSelect extends Component {
  renderSelect = field => {
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
          <option value="">No Committee Selected</option>
          {committees.map(item => {
            if (!this.props.hmc) {
              if (item.shortName === "HMC") {
                return <React.Fragment key={item.shortName} />;
              } else
                return (
                  <option key={item.shortName} value={item.shortName}>
                    {item.longName}
                  </option>
                );
            } else {
              return (
                <option key={item.shortName} value={item.shortName}>
                  {item.longName}
                </option>
              );
            }
          })}
        </select>
        <div className="helper_text">{touched ? error : ""}</div>
      </div>
    );
  };

  render() {
    return (
      <Field
        label="Committee"
        name="comName"
        type="text"
        component={this.renderSelect}
        onChange={(event, newValue, previousValue, name) => {
          this.props.onChange(newValue);
        }}
      />
    );
  }
}

CommitteeSelect.propTypes = {
  hmc: PropTypes.bool
};

CommitteeSelect.defaultProps = {
  hmc: false
};

export default CommitteeSelect;
