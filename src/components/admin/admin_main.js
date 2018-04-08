import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AdminNav from "./nav/admin_nav";
import CandidateForm from "./form/cand_form";
import CommitteeForm from "./form/comm_form";
import CandidateList from "./list/candidate_list";
import CommitteeList from "./list/committee_list";
import VoteView from "./vote_view";

class AdminMain extends Component {
  render() {
    return (
      <div>
        <AdminNav />
        <div className="col-md-6 offset-md-3">
          <Switch>
            <Route path="/admin/candidate_form" component={CandidateForm} />
            <Route path="/admin/committee_form" component={CommitteeForm} />
            <Route path="/admin/candidate_list" component={CandidateList} />
            <Route path="/admin/committee_list" component={CommitteeList} />
            <Route path="/admin/votes" component={VoteView} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminMain;
