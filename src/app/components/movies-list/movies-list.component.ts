import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  private url = 'http://image.tmdb.org/t/p/w342';
  @Input('movies') movies: Array<object>;

  constructor() { }

  ngOnInit() {
    
  }
}
