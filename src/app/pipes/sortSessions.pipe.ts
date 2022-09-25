import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortSessions'
})
export class SortSessionsPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((a,b) => Number(a.date) - Number(b.date));
  }

}
