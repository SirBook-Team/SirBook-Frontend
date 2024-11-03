import React from 'react';
import { SidebarContext } from './SidebarContext';
import { isLoggedIn, LoginContext } from './LoginContext';
import { useContext } from 'react';

const Notfound = () => {

    const [isSidebarActive] = useContext(SidebarContext);
    const [isLoggedIn] = useContext(LoginContext);

    return (
        <>
            <section className={isSidebarActive ? ((isLoggedIn) ? `bage-body active` : `bage active`) : ((isLoggedIn) ? `bage-body` : `bage`)}>
                <h2>404 Not Found</h2>
            </section>
        </>
    )
}

export default Notfound;
