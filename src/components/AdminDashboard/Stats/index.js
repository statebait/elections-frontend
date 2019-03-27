import React from "react";
import { connect } from "react-redux";
import { getStats } from "../../../store/actions/";

class StatsPage extends React.Component {
  componentDidMount() {
    this.props.getStats(this.props.token);
  }
  render() {
    return (
      <div style={{ paddingTop: 100 }}>
        <div>Total Accounts: {this.props.stats.totalCnt}</div>
        <div>Voted Accounts: {this.props.stats.votedCnt}</div>
        <div>
          {`Voter Turnout: ${(this.props.stats.votedCnt /
            this.props.stats.totalCnt) *
            100}%`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { stats: state.admin.stats, token: state.auth.token };
};

export default connect(
  mapStateToProps,
  { getStats }
)(StatsPage);
