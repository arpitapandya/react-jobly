import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import ProfileForm from "../profiles/ProfileForm";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );

    return (
        <div className="pt-4">
        <Switch>
            
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>

            <PrivateRoute exact path="/companies">
                <CompanyList />
            </PrivateRoute>

            <PrivateRoute path="/companies/:handle">
                <CompanyDetail />
            </PrivateRoute>

            <PrivateRoute exact path="/jobs">
                <JobList />
            </PrivateRoute>
            
            <PrivateRoute path="/profile">
                <ProfileForm />
            </PrivateRoute>

            <Redirect to="/" />
      </Switch>
        </div>
    );
}
export default Routes;