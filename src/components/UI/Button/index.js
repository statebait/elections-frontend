import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

const Button = props => {
  let classes = [];
  classes.push(props.styleClass);
  if (props.curved) {
    classes.push("curved-button");
  }
  let buttonContent;
  if (props.loading) {
    buttonContent = (
      <ReactLoading
        type={"bars"}
        color={props.color}
        height={"30px"}
        width={"30px"}
        className="button-loading-icon"
      />
    );
  } else {
    buttonContent = props.text;
  }
  return (
    <button
      type={props.type}
      className={classes.join(" ")}
      disabled={props.loading}
      onClick={props.onClick}
    >
      {buttonContent}
    </button>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  curved: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
  styleClass: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  loading: false,
  curved: false,
  text: "Button",
  type: "button",
  styleClass: "",
  color: "white"
};

export default Button;
