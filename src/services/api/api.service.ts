import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.themoviedb.org/3';
  private token = 'fa43ebcd4c44d7c07de607bbe938edfe';

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * 
   * @param url_dinamica endpoint da requisição
   * @param auth verifica se precisa ser autenticado ou não
   */
  get(url_dinamica: string, queryString?: string) {
    return new Promise((response, error) => {
      let complemento = url_dinamica + `?api_key=${this.token}` + (queryString || '');
      this.http.get(this.url + complemento).subscribe(data => response(data), err => console.log(err));
    });
  }
  /**
   * 
   * @param url_dinamica endpoint da requisição
   * @param body corpo da requisição
   */
  post(url_dinamica: string, body: {}) {
    return new Promise((response, error) => {
      this.http.post(this.url + url_dinamica, body,)
        .subscribe(data => response(data), err => error(err['error']));
    });
  }
}
