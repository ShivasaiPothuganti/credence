import './App.css'
import {useEffect} from "react";
import { logger } from './helpers/loggers/logger';
import {backend} from './services/api/Network/HttpHelper';
import { backendApiUrls } from './constants/backendApiEndpoints';
import { Button } from "@/components/ui/button";

function App() {

  useEffect(()=>{
      backend.get(backendApiUrls.data).then((response:unknown)=>{
        logger.debug(response);
      })
      .catch((err)=>{
        logger.debug(err)
      })
  })

  return (
    <div className='h-full w-full flex justify-center items-center' >
      <Button>click me </Button>
    </div>
  )
}

export default App;
