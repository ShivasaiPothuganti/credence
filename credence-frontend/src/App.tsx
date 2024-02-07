import './App.css';
import { Route, Routes} from "react-router-dom";
import LandingPage from './pages/Landing/LandingPage';
import AuthenticationPage from './pages/Authentication/Authentication';
import HomePage from './pages/Product/HomePage/HomePage';
import TransactionsPage from './pages/Product/TransactionsPage/TransactionsPage';
import CollaborationRoomsPage from './pages/Product/CollaborationRoomsPage/CollaborationRoomsPage';
import SplitBills from './pages/Product/SplitBills/SplitBills';
import DashBoardPage from './pages/Product/DashBoardPage/DashBoardPage';
import RemindersPage from './pages/Product/RemindersPage/RemindersPage';
import { useState } from 'react';
import { authenticationService } from './services/api/AuthenticationService';
import { Navigate } from 'react-router-dom';


function App() {

  const [authenticated,setAuthenticated] = useState(()=>{
    return !!authenticationService.getToken()
  });

  function isAuthenticated(Element:React.FunctionComponent){
      return authenticated? <Element /> : <Navigate to="/authenticate?mode=login" />;
  }


  return (
      <Routes>
        <Route path='/' element={<LandingPage/>} 
        />
        <Route path="/authenticate"  element={ <AuthenticationPage setAuth={setAuthenticated} /> } />
        <Route path='/product/'  element={isAuthenticated(HomePage)} >
            <Route path='transactions' Component={TransactionsPage} />
            <Route path='collaborationrooms' Component={CollaborationRoomsPage} />
            <Route path='splitbills' Component={SplitBills} />
            <Route path='dashboard' Component={DashBoardPage} />
            <Route path='billstopay' Component={RemindersPage} />
            <Route path='' Component={DashBoardPage} />
        </Route>
      </Routes> 
  )
}

export default App;
