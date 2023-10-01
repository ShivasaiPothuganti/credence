import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import LandingPage from './pages/Landing/LandingPage';
import AuthenticationPage from './pages/Authentication/Authentication';
import HomePage from './pages/Product/HomePage/HomePage';
import TransactionsPage from './pages/Product/TransactionsPage/TransactionsPage';
import CollaborationRoomsPage from './pages/Product/CollaborationRoomsPage/CollaborationRoomsPage';
import SplitBills from './pages/Product/SplitBills/SplitBills';
import DashBoardPage from './pages/Product/DashBoardPage/DashBoardPage';
import RemindersPage from './pages/Product/RemindersPage/RemindersPage';
import { authenticationService } from './services/api/Authentication';


function App() {

  const token:string|null = authenticationService.getToken();
  const [auth,setAuth] = useState(()=>{
    return token?true:false;
  });

  const NavigateToAuthenticationPage = ()=> <Navigate to='/authenticate?mode=login' />

  function hasToken(Element: React.FunctionComponent){
    return auth? <Element /> : <NavigateToAuthenticationPage/>
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} 
        />
        <Route path="/authenticate" element={ <AuthenticationPage setAuth={setAuth} /> } />
        <Route path='/product/' element={hasToken(HomePage)} >
            <Route path='transactions' Component={TransactionsPage} />
            <Route path='collaborationrooms' Component={CollaborationRoomsPage} />
            <Route path='splitbills' Component={SplitBills} />
            <Route path='dashboard' Component={DashBoardPage} />
            <Route path='billstopay' Component={RemindersPage} />
            <Route path='' Component={DashBoardPage} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
// orr 