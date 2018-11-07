import React, { Component } from "react";
import { connect } from "react-redux";
import { getResult } from "../../store/actions";
import ResultCard from "./ResultCard";

class VoteView extends Component {
  componentDidMount() {
    let token = localStorage.getItem("TOKEN");
    this.props.getResult(token);
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
    return (
      <div style={{ paddingTop: 100 }}>
        <h1>Results</h1>
        <br />
        {this.renderVotes()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  };
}

export default connect(
  mapStateToProps,
  { getResult }
)(VoteView);
