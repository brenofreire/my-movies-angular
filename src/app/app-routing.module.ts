import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieComponent } from './components/movie-page/movie.component';


const routes: Routes = [
  {
    path: '', component: HomePageComponent,
  },
  {
    path: 'movie/:id', component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }