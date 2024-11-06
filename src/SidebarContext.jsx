import React from "react";
import { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {

    // handel variables
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    return (
        <>
            <SidebarContext.Provider value={[ isSidebarActive, setIsSidebarActive]}>
                {children}
            </SidebarContext.Provider>
        </>
    );
};
