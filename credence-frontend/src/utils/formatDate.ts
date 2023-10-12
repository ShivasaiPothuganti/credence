export function transformISOtoDateTime(dateInString:string):string{
    if(dateInString){
        let [date,_time] = dateInString.split('T');
        date = date.split('-').reverse().join('/'); 
        return date;
    }
    return dateInString;
}