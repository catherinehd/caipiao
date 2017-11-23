import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFixed'
})
export class NumFixedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    return value.toFixed(args);
  }

}
