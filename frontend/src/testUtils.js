import React from "react";
import UserContext from "./UserContext";

const demoUser = {
    username: "test",
    first_name: "test",
    last_name: "mctest",
    email: "test@test.net",
    photo_url: null
};


const UserProvider = ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
        {children}
    </UserContext.Provider>
);
export { UserProvider };