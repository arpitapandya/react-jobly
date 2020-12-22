import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

import useTimedMessage from "../hooks/useTimedMessage";


function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
  
    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
  
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
  
      let username = formData.username;
      let updatedUser;
  
      try {
        updatedUser = await JoblyApi.saveProfile(username, profileData);
      } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
      }
  
      setFormData(f => ({ ...f, password: "" }));
      setFormErrors([]);
      setSaveConfirmed(true);
  
      // trigger reloading of user information throughout the site
      setCurrentUser(updatedUser);
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }
  
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password to make changes:</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>
  
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
  
                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}
  
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
  
  export default ProfileForm;
  