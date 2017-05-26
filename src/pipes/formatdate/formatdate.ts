import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdate',
})
export class FormatdatePipe implements PipeTransform {

  transform(value: Date) {
  	let date = new Date(value);
    return date.toDateString();
  }
}
