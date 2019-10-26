import { Component, ApplicationRef } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';

import { MoviesService } from 'src/services/movies/movies.service';


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
    private moviesServ: MoviesService,
  ) {
    this.getMovies();
    this.getGenres();
  }
  /**
   * @param page Auxiliar para ajudar na paginação da API
   * @returns Retorna lista de filmes.
   */
  getMovies(page: number = 1) {
    this.loading = true;
    this.moviesServ.getMovies(page).then(response => {
      this.renderPaginate(response['total_pages']);
      this.moviesHelper = response['results'];
      this.renderCurrentPage();
      this.loading = false;
    });
  }
  /**
   * Ao clicar no botão, renderiza conteúdo da página atual
   * @param page index da página
   */
  renderCurrentPage(page: number = 0) {
    this.movies = this.moviesHelper.slice(page * 5, (page + 1) * 5);
    console.log('index', page);    
    this.currentPage = page || page == 0 ? page + 1 : this.currentPage;
    if (!this.movies.length) this.getMovies(2);
    console.log(this.currentPage);    
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
    this.genres = await this.moviesServ.getGenres();
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
   * @description cria o array de páginas, e limita até 5 páginas como no template
   * @param pages número maximo ou total de páginas, que nesse caso vai ser 5
   */
  renderPaginate(pages: number) {
    this.pages = [];
    for (let i = 0; i < pages; i++) {
      this.pages.push(i);
      if (i == 4) break;
    }
  }
}
