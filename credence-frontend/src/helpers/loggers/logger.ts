const loggerHelper = ()=>{

    const isDevMode = import.meta.env.DEV;

    const logger = {
        debug:isDevMode?console.log.bind(window.console):(_message:unknown)=>{},
        error:isDevMode?console.error.bind(window.console):(_message:unknown)=>{},
        warn:isDevMode?console.warn.bind(window.console):(_message:unknown)=>{}
    };

    return logger;

}

export const logger = loggerHelper();