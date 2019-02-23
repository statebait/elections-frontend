import React from "react";
import _ from "lodash";
import "./style.scss";

const Winners = props => {
  let newWinnersList = [];
  _.map(props.candidates, candidate => {
    _.map(props.winners, winner => {
      if (candidate.sid === winner) {
        newWinnersList.push({
          sid: candidate.sid,
          name: candidate.name
        });
      }
    });
  });
  return newWinnersList.map(item => {
    return (
      <li key={item.sid} className="list-group-item">
        {item.name} - {item.sid}
      </li>
    );
  });
};

const ResultCard = props => {
  return (
    <div className="card mb-3 result-card">
      <div className="card-body">
        <h5 className="card-title">{props.data.comName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.data.batches}</h6>
        <ul className="list-group list-group-flush">
          <Winners
            winners={props.data.winners}
            candidates={props.data.candidates}
          />
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
