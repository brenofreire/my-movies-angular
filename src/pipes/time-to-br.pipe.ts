import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeToBr'
})
export class TimeToBrPipe implements PipeTransform {
  /**
   * @param date Data em string
   * @returns Data em formato dia/mes/ano
   */
  transform(value: string): string {
    return moment(value).format('DD/MM/YYYY');
  }

}
