import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public url: string = 'http://image.tmdb.org/t/p/w500';
  public url_trailer: string = '';
  private params: {};
  public id: number;
  public movie: any[] = [];
  public loading: boolean = true;
  public sanitizerEmbend;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getMovieInfo();
  }
  /**
   * @returns O objeto com as informações do filme
   */
  async getMovieInfo(): Promise<any> {
    this.api.get(`/movie/${this.id}`, '&append_to_response=videos').then(response => {
      this.movie = <any>response;
      if (this.movie['videos']) this.getsTrailer();
      this.loading = false;
    });
  }
  /**
   * @description Atribui a infomações do trailer
   */
  getsTrailer(): void {
    for (let link of this.movie['videos']['results']) {
      if (link['site'] == 'YouTube') this.url_trailer = 'http://www.youtube.com/embed/' + link['key'];
      break;
    }
    this.url_trailer = this.sanitize(this.url_trailer);
  }
  /**
   * @description Abre exceção para exibição de conteúdo vindo do youtube
   * @param url A url do vídeo deseja confiar
   */
  sanitize(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  /**
   * @param obj É o objeto a ser mapeado
   */
  objectKeys(obj: {}): Array<string | number> {
    return Object.keys(obj);
  }
  /**
   * @description Mapeia os gêneros do filme em um array flat
   * @param genres Array a ser mapeado
   */
  getGenresId(genres: Array<object>) {
    return genres.map(item => item['id']);
  }
}
