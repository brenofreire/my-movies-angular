import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public url = 'http://image.tmdb.org/t/p/w500';
  private genres = [];
  @Input('movies') movies: Array<object>;

  constructor(
    private moviesServ: MoviesService,
  ) { }

  ngOnInit() {
    this.getGenres();
  }

  objectKeys(obj: {}): Array<string> {
    return Object.keys(obj);
  }
  /**
   * @description Busca e armazena os gêneros disponíveis;
   * @returns Os gêneros disponíveis
   */
  async getGenres(): Promise<any> {
    this.genres = await this.moviesServ.getGenres();
  };
  /**
   * @description Baseado no id go gênero, retorna o nome dele
   * @param id 
   * @returns Nome do gênero
   */
  returnGenreName(id: number): string {
    for (let genre of this.genres) if (genre.id == id) return genre.name;
  }
}
