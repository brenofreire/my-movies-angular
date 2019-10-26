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
  private moviesHelper: any[] = [];
  private loading = true;
  private genres = [];
  public currentPage = 1;
  public pages: any[] = [];

  constructor(
    private api: ApiService,
  ) {
    this.getMovies();
    this.getGenres();
  }
  /**
   * @description Como a API retorna 20 filmes por vez, o parâmetro "page" serve para controlar
   * a página desejada após o vigésimo registro. 
   * @param page Auxiliar para ajudar na paginação da API
   * @returns Retorna lista de filmes.
   */
  getMovies(page: number = 1) {
    this.loading = true;
    let queryString = this.queryStringGetMovies(page);
    this.api.get('/movie/top_rated', queryString).then(async response => {
      this.renderPaginate(response['total_pages']);
      this.moviesHelper = response['results'];
      this.renderCurrentPage();
      this.loading = false;
    });
  }
  /**
   * Ao clicar no botão, renderiza conteúdo da página tual
   * @param page index da página
   */
  renderCurrentPage(page: number = 0) {
    this.movies = this.moviesHelper.slice(page * 5, (page + 1) * 5);
    this.currentPage = page ? page + 1 : this.currentPage;
    if(!this.movies.length) this.getMovies(2);
  }
  /**
   * @description Monta a query string do método de buscar lista filmes
   * @returns Query string
   */
  queryStringGetMovies(page: number) {
    return `&page=${page}`;
  }
  /**
   * @description Retorna as keys do objeto para iterar no array
   * @param obj 
   * @returns Array de keys
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
   * @description Baseado no id go gênero, retorna o nome dele
   * @param id 
   * @returns Nome do gênero
   */
  returnGenreName(id: number) {
    for (let genre of this.genres) if (genre.id == id) return genre.name;
  }
  /**
   * @param date Data em string
   * @returns Data em formato dia/mes/ano
   */
  timeToBR(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }  
  /**
   * @description
   * @param pages 
   */
  renderPaginate(pages: number) {
    this.pages = [];
    for (let i = 0; i < pages; i++) {
      this.pages.push(i);
      if(i == 4) break;
    }
  }
}
