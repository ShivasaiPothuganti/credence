import './App.css'
import {useEffect} from "react";
import { logger } from './helpers/loggers/logger';

function App() {



  useEffect(()=>{
    logger.error("Hi there I am running ");
  })

  return (
    <div>
      
    </div>
  )
}

export default App;
