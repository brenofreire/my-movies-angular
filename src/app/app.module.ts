import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeToBrModule } from 'src/pipes/time-to-br.module';
import { BackgroundDirective, PaddingDirective, FullDirective, CenterDirective } from '../directive/main.directive';
import { MovieComponent } from './components/movie/movie.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundDirective,
    PaddingDirective,
    FullDirective,
    CenterDirective,
    MovieComponent,
    HeaderComponent,
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
