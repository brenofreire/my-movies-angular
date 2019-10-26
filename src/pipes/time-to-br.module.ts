import { TimeToBrPipe } from './time-to-br.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    TimeToBrPipe, 
  ],
  exports: [
    TimeToBrPipe,
  ]
})   
export class TimeToBrModule {}