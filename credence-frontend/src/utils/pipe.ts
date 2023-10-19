 /* eslint-disable @typescript-eslint/no-explicit-any */
// const pipe = (...functions:any[]) => 
//   (value:any) => {
//     return functions.reduce((currentValue, currentFunction) => {
//       return currentFunction(currentValue);
//     }, value);
//   };

import { logger } from "@/helpers/loggers/logger";

const pipe = (...functions:any[])=>{
    logger.debug(functions);
    
}

export {pipe};