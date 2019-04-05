import React from "react";
import { floorMapper } from "../../../utils/utilityFunctions";
import { committeeMapDetailed, committeeMap } from "../../../data";

function CommitteeName(props) {
  if (props.useDetailed) {
    if (committeeMapDetailed[props.name]) {
      return <div>{committeeMapDetailed[props.name]}</div>;
    } else if (props.name[1] === "/") {
      return <div>{floorMapper(props.name)}</div>;
    } else {
      return <div>{props.name}</div>;
    }
  } else {
    if (committeeMap[props.name]) {
      return committeeMap[props.name];
    } else if (props.name[1] === "/") {
      return <div>{floorMapper(props.name)}</div>;
    } else {
      return <div>{props.name}</div>;
    }
  }
}

export default CommitteeName;
