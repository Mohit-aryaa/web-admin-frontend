import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cameltostring'
})
export class CameltostringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const result = value.replace(/([A-Z])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1));
  }

}
