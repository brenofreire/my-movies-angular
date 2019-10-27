import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToBr'
})
export class StatusToBrPipe implements PipeTransform {

  transform(value: string): string {
    if(value == 'Rumored') return 'Rumor';
    if(value == 'Planned') return 'Previsto';
    if(value == 'In Production') return 'Em produção';
    if(value == 'Post Production') return 'Pós produção';
    if(value == 'Released') return 'Lançado';
    if(value == 'Canceled') return 'Cancelado';
  }
}
