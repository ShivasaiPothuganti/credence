import './App.css'
import React,{useEffect} from "react";
import { logger } from './helpers/loggers/logger';

function App() {

  useEffect(()=>{
    logger.getLogger()("hello this is from app")
  })

  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default App;
