import React, { useState, createContext } from "react";
export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const onUserLogin = (data) => {
        setUserData(data);
    }

    const onUserLogOut = () => {
        setUserData(null);
    }
    return (
        <UserContext.Provider value={{ userData, onUserLogin, onUserLogOut }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;