import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private api: ApiService,
  ) { }
  /**
   * @description Monta a query string do método de buscar lista filmes
   * @returns Query string
   */
  queryStringGetMovies(page: number) {
    return {
      string: `&page=${page}`,
      url: '/movie/popular',
    }
  }
  /**
   * @description Monta a query string do método de buscar lista filmes
   * @returns Query string
   */
  queryStringSearchMovies(searchValue: string, page: number) {
    return {
      string: `&language=en-US&query=${searchValue}&page=${page}&include_adult=false`,
      url: '/search/movie',
    }
  }
  /**
   * @description Busca e armazena os gêneros disponíveis;
   * @returns Os gêneros disponíveis
   */
  async getGenres() {
    let info = <any>await this.api.get(`/genre/movie/list`);
    return info['genres'];
  }
  /**
   * @description Como a API retorna 20 filmes por vez, o parâmetro "page" serve para controlar
   * a página desejada após o vigésimo registro. 
   * @param page Auxiliar para ajudar na paginação da API
   * @returns Retorna lista de filmes.
   */
  getMovies(page: number = 1, searchValue: string): Promise<any> {
    return new Promise(res => {
      console.log(page, searchValue);
      let query = searchValue && searchValue.length ? this.queryStringSearchMovies(searchValue, page) : this.queryStringGetMovies(page);
      console.log(query);
      this.api.get(query['url'], query['string']).then(response => {
        res(response);
      });
    });
  }
}
