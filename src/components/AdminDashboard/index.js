import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "react-s-alert";
import { connect } from "react-redux";
import { logOut } from "../../store/actions";

//Component Imports
import AdminNav from "./NavBar";
import HmcForm from "./Forms/HmcForm";
import CandidateForm from "./Forms/CandidateForm";
import CommitteeForm from "./Forms/CommitteForm";
import CandidateList from "./DataLists/CandidateList";
import CommitteeList from "./DataLists/CommitteeList";
import VoteView from "./ResultView";

//Alert CSS
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

class AdminDashboard extends Component {
  logOut = () => {
    this.props.logOut();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <AdminNav logout={this.logOut} />
        <div className="col-md-6 offset-md-3">
          <Switch>
            <Route path="/admin/candidate_form" component={CandidateForm} />
            <Route path="/admin/committee_form" component={CommitteeForm} />
            <Route path="/admin/candidate_list" component={CandidateList} />
            <Route path="/admin/hmc_form" component={HmcForm} />
            <Route path="/admin/committee_list" component={CommitteeList} />
            <Route path="/admin/results" component={VoteView} />
          </Switch>
        </div>
        <Alert stack={{ limit: 3 }} position="bottom-right" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  { logOut }
)(AdminDashboard);
