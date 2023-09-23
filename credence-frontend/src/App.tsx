import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from './pages/Landing/LandingPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={LandingPage} />
      </Routes>
    </Router>
  )
}

export default App;
// orr 