import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bundleProductPipe'
})
export class BundleProductPipe implements PipeTransform {

  result: any;
  transform(value: any[], ...args: unknown[]): unknown {
    var getResult = [];
    console.log(value)
    for (let i = 0; i < value.length; i++) {
      getResult.push(value[i].productName)
      this.result = getResult.toString().replace(/,[s]*/g, ", ");;
    }
    return this.result;
  }

}
