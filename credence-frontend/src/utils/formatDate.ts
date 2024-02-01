/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
export function transformISOtoDateTime(dateInString:string):string{
    if(dateInString){
        let [date,_time] = dateInString.split('T');
        date = date.split('-').reverse().join('-'); 
        return date;
    }
    return dateInString;
}

export function compareTwoDates(date1:string|Date,date2:string|Date):number{
    
    date1 = new Date(date1);
    date2 = new Date(date2);

    const byMonths = date1.getMonth() > date2.getMonth()? 1 : date1.getMonth() === date2.getMonth()? 0:-1;
    const byDate = date1.getDate() > date2.getDate()? 1 : date1.getDate() === date2.getDate()? 0:-1;
    const byYear = date1.getFullYear() > date2.getFullYear()? 1 : date1.getFullYear() === date2.getFullYear()? 0:-1;

    if(byYear!==0){
        return byYear;
    }
    else if(byMonths!==0) {
        return byMonths;
    }
    else {
        return byDate;
    }

}


export function getDateOnly(date:string):string{
    return date.split('T')[0];
}

export function convertDateToMonth(dateString:string){
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    return formattedDate;
}