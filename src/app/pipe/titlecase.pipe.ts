import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase2'
})
export class TitlecasePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const result = value.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

}
