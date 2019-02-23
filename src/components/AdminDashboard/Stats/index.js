import React from "react";
import { connect } from "react-redux";
import { getStats } from "../../../store/actions/";
import ReactChartkick, { PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

class StatsPage extends React.Component {
  componentDidMount() {
    this.props.getStats(this.props.token);
  }
  render() {
    return (
      <div style={{ paddingTop: 100 }}>
        <h1>Total Accounts: {this.props.stats.totalCnt}</h1>
        <PieChart
          data={[
            ["Absent", this.props.stats.totalCnt - this.props.stats.votedCnt],
            ["Voted", this.props.stats.votedCnt]
          ]}
        />
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
