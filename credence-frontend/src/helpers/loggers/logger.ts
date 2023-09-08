class Logger{
    logger = console.log.bind(window.console);
    debug(message:unknown):void{
        if(import.meta.env.DEV){
            
            this.logger(`%cDEBUG %c ${message} `,'background-color:blue;color:white','color:black')
        }
    }

    error(message:unknown):void{
        if(import.meta.env.DEV){
            console.error(`%cERROR %c ${message}`,'background-color:red;color:white','color:black')
        }
    }

    warn(message:unknown):void{
        if(import.meta.env.DEV){
            console.warn(`%cWARN %c ${message}`,'background-color:yellow;color:black','color:black')
        }
    }

    getLogger(){
        return this.logger;
    }

}


export const logger = new Logger();
