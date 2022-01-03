import React, { useEffect, useState } from "react";
import { app } from "./base";
import * as FirebaseAuth from 'firebase/auth';
import Login from "./pages/Login";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        FirebaseAuth.getAuth().onAuthStateChanged(setCurrentUser);
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