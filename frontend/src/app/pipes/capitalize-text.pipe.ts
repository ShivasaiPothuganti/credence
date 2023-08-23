import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'capitalizeText'
})
export class CapitalizeTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let capitalizedText = value;
    let firstLetter = value[0];
    firstLetter = firstLetter.toUpperCase();
    capitalizedText = firstLetter + value.substring(1);
    return capitalizedText;
  }

}
