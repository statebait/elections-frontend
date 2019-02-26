import React from "react";

const UserDetails = props => {
  return (
    <div
      style={{
        paddingTop: 100,
        marginLeft: "100px"
      }}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Voting For:</h5>
          <h6 className="card-title">{props.name}</h6>
          <h6 className="card-title">{props.sid}</h6>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
