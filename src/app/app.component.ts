import { Component } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public url = 'http://image.tmdb.org/t/p/w500';
  private movies;
  private loading = true;
  private genres = [];
  public queryString = {
    page: 1,
    total_results: 5,
    total_pages: 5,
  }
  public pages: any[] = [];

  constructor(
    private api: ApiService,
  ) {
    this.getMovies();
    this.getGenres();
  }
  /**
   * @description Retorna lista de filmes. Inicialmente os mais bem avaliados.
   */
  getMovies() {
    let queryString = this.queryStringGetMovies();
    this.api.get('/movie/top_rated', queryString).then(async response => {
      this.renderizaPaginate(response['total_pages']);
      this.movies = response['results'];
      this.movies.slice(5);
      this.loading = false;
    });
  }
  /**
   * @description Monta a query string do método de buscar lista filmes
   * @returns query string
   */
  queryStringGetMovies() {
    return `&page=${this.queryString.page}`;
  }
  /**
   * @param obj 
   * @description retorna as keys do objeto para iterar no array
   */
  objectKeys(obj: {}) {
    return Object.keys(obj);
  }
  /**
   * @description Busca e armazena os gêneros disponíveis;
   * @returns Os gêneros disponíveis
   */
  async getGenres() {
    let info = <any>await this.api.get(`/genre/movie/list`);
    this.genres = info['genres'];
  };
  /**
   * @param id 
   * @description baseado no id go gênero, retorna o nome dele
   * @returns nome do gênero
   */
  returnGenreName(id: number) {
    for (let genre of this.genres) if (genre.id == id) return genre.name;
  }
  /**
   * @param date data em string
   * @returns data em formato dia/mes/ano
   */
  timeToBR(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }
  renderizaPaginate(pages: number) {
    let half = Math.floor(pages / 2);   
    if (pages <= 10) {
      for (let i = 1; i <= pages; i++) this.pages.push(i);
    } else {
      for (let i = 1; i <= pages; i++) {
        if (i <= 3) this.pages.push(i);
        if(i >= half && i < half + 3) this.pages.push(i);
        if (i > pages - 3) this.pages.push(i);
      }
      this.pages.splice(3, 0, '...');
      this.pages.splice(7, 0, '...');
    }
  }
}
