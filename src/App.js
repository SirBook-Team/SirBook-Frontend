import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import { LoginProvider } from './LoginContext';
import Sidebar from './Sidebar';
import { SidebarProvider } from './SidebarContext';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import Main from './Main';
import UserProfile from './UserProfile';
import Notfound from './Notfound';
import Users from './Users';

import './Reset.css';
import './App.css';

function App() {

  return (
    <>
      <LoginProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Navbar/>
            <Sidebar/>
            <Routes>
              <Route path='/home' element={<Main/>}/>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/profile/:userId' element={<UserProfile/>}/>
              <Route path='/profile/Update' element={<UpdateProfile/>}/>
              <Route path='/notfound' element={<Notfound/>}/>
              <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </LoginProvider>
    </>
  );
}

export default App;
