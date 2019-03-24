import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, filterBy: string): any {
    return items.filter(item => item.name.indexOf(filterBy) !== -1);
  }

}
