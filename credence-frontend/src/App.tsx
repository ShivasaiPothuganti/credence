import './App.css'
import {useEffect} from "react";
import { logger } from './helpers/loggers/logger';
import { http } from './lib/Network/HttpHelper';

function App() {



  useEffect(()=>{
    http.get('/').then((response)=>{
      logger.debug(response);
    }).catch((error)=>{
      logger.error(error)
    })
  })

  return (
    <div>
      
    </div>
  )
}

export default App;
