import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    var result = '';
    var firstWords = []
    var words = value.split(" ");
    firstWords.push(words);
    for (let index = 0; index < firstWords.length; index++) {
          const element = firstWords[index];
          //console.log('element' ,element)
          const shortName = element.map((el) => el[0]).join('')
          result = shortName
          //console.log('short name', res[i].shortName)
    }
    return result;
  }

}
