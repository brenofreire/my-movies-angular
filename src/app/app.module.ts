import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeToBrModule } from 'src/pipes/time-to-br.module';
import { BackgroundDirective, PaddingDirective, FullDirective, CenterDirective, ContentBetweenDirective } from '../directive/main.directive';
import { MovieComponent } from './components/movie-page/movie.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StatusToBrPipe } from 'src/pipes/status-to-br.pipe';
import { ToHourPipe } from 'src/pipes/to-hour.pipe';
import { TagsComponent } from './components/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundDirective,
    PaddingDirective,
    FullDirective,
    CenterDirective,
    ContentBetweenDirective,
    MovieComponent,
    HeaderComponent,
    PaginateComponent,
    MoviesListComponent,
    HomePageComponent,
    StatusToBrPipe,
    ToHourPipe,
    TagsComponent,
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
