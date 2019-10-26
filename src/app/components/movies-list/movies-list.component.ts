import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public url = 'http://image.tmdb.org/t/p/w500';
  @Input('movies') movies: Array<object>;

  constructor() { }

  ngOnInit() {
    
  }
}
