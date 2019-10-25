import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'http://br.web.img3.acsta.net/c_215_290/pictures/17/08/26/00/05/175443.jpg';
  constructor(){
    console.log('AAA');    
  }
}
