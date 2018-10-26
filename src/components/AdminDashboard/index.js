import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "react-s-alert";
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
  render() {
    return (
      <div>
        <AdminNav />
        <div className="col-md-6 offset-md-3">
          <Switch>
            <Route path="/admin/candidate_form" component={CandidateForm} />
            <Route path="/admin/committee_form" component={CommitteeForm} />
            <Route path="/admin/candidate_list" component={CandidateList} />
            <Route path="/admin/hmc_form" component={HmcForm} />
            <Route path="/admin/committee_list" component={CommitteeList} />
            <Route path="/admin/votes" component={VoteView} />
          </Switch>
        </div>
        <Alert stack={{ limit: 3 }} position="bottom-right" />
      </div>
    );
  }
}

export default AdminDashboard;
