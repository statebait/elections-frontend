import React, { Component } from "react";
import { connect } from "react-redux";
import { getResult } from "../../../store/actions";
import ResultCard from "./ResultCard";
import Button from "../../UI/Button";

class ResultsView extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.props.getResult(this.props.token);
  }

  renderVotes() {
    let results = this.props.admin.results;
    if (results) {
      let n = 0;
      return results.map(item => {
        n++;
        return <ResultCard key={n} data={item} />;
      });
    } else {
      return <div>Loading...</div>;
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
          }}
          styleClass="btn btn-primary"
          text="Show"
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
