import React, { useEffect, useState } from "react";
import Base from "./base";
import * as FirebaseAuth from 'firebase/auth';
import Login from "./pages/Login";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unlisten = FirebaseAuth.getAuth().onAuthStateChanged(authUser => {
            authUser ? setCurrentUser(authUser) : setCurrentUser(null);
        });

        return () => {
            unlisten();
        }
    }, []);

    if (!currentUser) {
        return (
            <AuthContext.Provider value={{ currentUser }}> <Login /> </AuthContext.Provider>
        )
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
    );
};