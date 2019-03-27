import React from "react";
import { useMap, floorMapper } from "../../../utils/utilityFunctions";
import { committeeMapDetailed, committeeMap } from "../../../data";

function CommitteeName(props) {
  if (props.useDetailed) {
    if (useMap) {
      if (committeeMapDetailed[props.name]) {
        return <div>{committeeMapDetailed[props.name]}</div>;
      } else {
        return <div>{floorMapper(props.name)}</div>;
      }
    } else {
      return <div>{props.name}</div>;
    }
  } else {
    if (useMap) {
      if (committeeMap[props.name]) {
        return committeeMap[props.name];
      } else {
        return <div>{floorMapper(props.name)}</div>;
      }
    } else {
      return <div>{props.name}</div>;
    }
  }
}

export default CommitteeName;
