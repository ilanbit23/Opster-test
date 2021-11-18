import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  filterBy: string = '';
  @Output() onSearch = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  doSearch(): void {
    console.log('this.filterBy',this.filterBy);

    this.onSearch.emit(this.filterBy);
    // this.$emit('onSearch', this.filterBy)
  }
}
