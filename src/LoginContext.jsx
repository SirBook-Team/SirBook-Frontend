import React from "react";
import { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    return (
        <>
            <LoginContext.Provider value={[ isLoggedIn, setIsLoggedIn, isSidebarActive, setIsSidebarActive]}>
                {children}
            </LoginContext.Provider>
        </>
    );
};
