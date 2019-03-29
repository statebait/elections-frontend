import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { getResult } from "../../../store/actions";
import ResultCard from "./ResultCard";
import Button from "../../UI/Button";

class ResultsView extends Component {
  state = {
    show: false
  };

  renderVotes() {
    let results = this.props.admin.results;
    let n = 0;
    if (results.length !== 0) {
      return results.map(item => {
        n++;
        return <ResultCard key={n} data={item} />;
      });
    } else {
      return (
        <ReactLoading
          type={"cubes"}
          color={"black"}
          height={"50px"}
          width={"50px"}
        />
      );
    }
  }

  render() {
    let display;
    if (this.state.show) {
      display = <div>{this.renderVotes()}</div>;
    } else {
      display = (
        <Button
          onClick={() => {
            this.setState({ show: true });
            this.props.getResult(this.props.token);
          }}
          className="btn btn-primary"
          text="Compute"
        />
      );
    }
    return (
      <div style={{ paddingTop: 100 }}>
        <h1>Results</h1>
        <br />
        {display}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    token: state.auth.token
  };
}

export default connect(
  mapStateToProps,
  { getResult }
)(ResultsView);
