import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
      <div className="Homepage">
        <div className="container text-center">
            <h1 className="mb-4 font-weight-bold">Jobly</h1>
            <p className="lead">All the jobs in one, convenient place.</p>
            { currentUser ? 
                <h2>
                    Welcome Back {currentUser.first_name || currentUser.username}!</h2>
             : (
                <p>
                <Link className="btn btn-primary font-weight-bold mr-4" to="/login">
                    Log In!
                </Link>
                
                <Link className="btn btn-primary font-weight-bold"
                    to="/signup">
                  Sign up
                </Link>
             </p>
            )}
        </div>
      </div>
    );
}

export default Homepage;