import './App.css'
import {useEffect} from "react";
import { logger } from './helpers/loggers/logger';
import {backend} from './lib/Network/HttpHelper';
import { backendApiUrls } from './constants/backendApiEndpoints';


function App() {

  useEffect(()=>{
      backend.get(backendApiUrls.data).then((response:unknown)=>{
        // logger.debug();
      })
      .catch((err)=>{
        logger.debug(err)
      })
  })

  return (
    <div>
      <h1 className='bg-black' >hi</h1>
    </div>
  )
}

export default App;
