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
  private movies: any[] = [];
  private moviesHelper: any[] = [];
  private loading = true;
  private genres = [];
  public currentPage: number = 1;
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
   * @description O processo de montagem do array foi baseado no que foi pedido
   * no repositório. Por isso tem algumas verificações estáticas. Num outro cenário,
   * essas verificações seriam dinâmicas. 
   */
  getMovies(page: number = 1) {
    this.moviesServ.getMovies(page).then(response => {
      this.setsMoviesHelper(response['results']);
      this.renderCurrentPage(page == 2 ? 4 : null);
      this.renderPaginatePages(response['total_pages']);
      this.loading = false;
    });
  }
  /**
   * 
   * @param results Monta o array de filmes. Como estou seguindo template, 
   * eu fiz de uma que ele para de recarregar na página 5 (index 4).
   */
  setsMoviesHelper(results: Array<object>): void {
    if (results.length && this.moviesHelper.length) {
      this.moviesHelper = this.moviesHelper.concat(results.slice(0, 5));
    } else this.moviesHelper = results;
  }
  /**
   * Ao clicar no botão, renderiza conteúdo da página atual
   * @param page index da página
   */
  renderCurrentPage(page: number = 0): void {
    this.movies = this.moviesHelper.slice(page * 5, (page + 1) * 5);
    this.currentPage = page || page == 0 ? page + 1 : this.currentPage;
    if (!this.movies.length) this.getMovies(2);
  }
  /**
   * @description Retorna as keys do objeto para iterar no array
   * @param obj 
   * @returns Array de keys
   */
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
  /**
   * @description cria o array de páginas, e limita até 5 páginas como no template
   * @param pages número maximo ou total de páginas, que nesse caso vai ser 5
   */
  renderPaginatePages(pages: number): void {
    this.pages = [];
    for (let i = 0; i < pages; i++) {
      this.pages.push(i);
      if (i == 4) break;
    }
  }
}