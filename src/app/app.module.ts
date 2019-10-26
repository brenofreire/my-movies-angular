import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeToBrPipe } from '../pipes/time-to-br.pipe';
import { TimeToBrModule } from 'src/pipes/time-to-br.module';
import { BackgroundDirective, PaddingDirective, FullDirective, CenterDirective } from '../directive/main.directive';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundDirective,
    PaddingDirective,
    FullDirective,
    CenterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TimeToBrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
