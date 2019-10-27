import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from 'src/services/movies/movies.service';
import { debounceTime } from "rxjs/operators";
import { ApiService } from 'src/services/api/api.service';
import { Subject, Observable } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private url = 'http://image.tmdb.org/t/p/w500';
  private movies: any[] = [];
  private moviesHelper: any[] = [];
  private loading = true;
  private currentPage: number = 1;
  private pages: any[] = [];
  private searchValue: string;
  private searchChanged = new Subject<string>();


  constructor(
    private moviesServ: MoviesService,
  ) {
    this.getMovies();
    this.searchChanged.pipe(debounceTime(400)).subscribe(() => {
      this.getMovies();      
    });
  }
  ngOnInit() { }
  /**
   * @param page Auxiliar para ajudar na paginação da API
   * @returns Retorna lista de filmes.
   * @description O processo de montagem do array foi baseado no que foi mostrado
   * no repositório. Por isso tem algumas verificações estáticas. Num outro cenário,
   * essas verificações seriam dinâmicas, ou não seria necessárias.
   */
  getMovies(page: number = 1): void {
    if(this.searchValue && page != 2) this.moviesHelper = [];
    if(!this.searchValue && page != 2) this.moviesHelper = [];
    this.moviesServ.getMovies(page, this.searchValue).then(response => {
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
    console.log(results.length);
    if (results.length && this.moviesHelper.length) {
      this.moviesHelper = this.moviesHelper.concat(results.slice(0, 5));
    } else this.moviesHelper = results;
  }
  /**
   * @description Renderiza conteúdo da página atual
   * @param page index da página
   */
  renderCurrentPage(page: number = 0): void {
    this.movies = this.moviesHelper.slice(page * 5, (page + 1) * 5);
    this.currentPage = page || page == 0 ? page + 1 : this.currentPage;
    if (!this.movies.length) this.getMovies(2);
    window.scroll(0,0);
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
   * @description Cria o array de páginas, e limita até 5 páginas como no template
   * @param pages Número maximo ou total de páginas, que nesse caso vai ser 5
   */
  renderPaginatePages(pages: number): void {
    this.pages = [];
    for (let i = 0; i < pages; i++) {
      this.pages.push(i);
      if (i == 4) break;
    }
  }
  /**
   * @description Cria um debounce pra procurar os filmes adequadamente
   */
  searchMovie() {
    this.currentPage = 1;
    this.searchChanged.next();
  }
}
