import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Input('pages') pages: Array<number>;
  @Input('currentPage') currentPage: number;

  @Output('render') render = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  renderCurrentPage(page: number){
    this.render.emit(page);
  }

}
