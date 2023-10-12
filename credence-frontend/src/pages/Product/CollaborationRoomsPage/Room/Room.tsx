import { logger } from '@/helpers/loggers/logger'
import { backend } from '@/services/api/Network/HttpHelper'
import React, { useEffect } from 'react'

type RoomId = {
  roomId:string
}

function Room({roomId}:RoomId) {

  

  useEffect(()=>{
    backend.get(`http://localhost:8080/rooms/${roomId}/transactions`).then((data)=>{
      logger.warn(data.data, "this is room data")
    })
  })

  return (
    <div>
        
    </div>
  )
}

export default Room