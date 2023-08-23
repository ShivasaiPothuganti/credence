import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value.length <= 15) {
      return value;
    } else {
      return value.substring(0, 15) + "...";
    }
  }

}
