class Logger{
    debug(message:unknown):void{
        if(import.meta.env.DEV){
            console.log(message)
        }
    }

    error(message:unknown):void{
        if(import.meta.env.DEV){
            console.log(message)
        }
    }

    warn(message:unknown):void{
        if(import.meta.env.DEV){
            console.log(message)
        }
    }

}


export const logger = new Logger();
