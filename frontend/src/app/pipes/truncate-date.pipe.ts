import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDate'
})
export class TruncateDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const originalDate = "2023-04-13T17:09:42.411";
    const dateObject = new Date(originalDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; 
    const year = dateObject.getFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
    return formattedDate;
  }

}
