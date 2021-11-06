import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorPipe'
})
export class VendorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var status = '';
    if(value == true) {
      status = 'Active'
    } else {
      status = 'In Active'
    }
    return status;
  }

}
