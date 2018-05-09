import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.styl']
})
export class StarComponent implements OnInit {
  @Input() num: number;
  starList: any[];
  halfstar: boolean;

  constructor() { }

  ngOnInit() {
    if (String(this.num).indexOf('.') > -1) {
      this.halfstar = true;
      this.starList = [];
      for (let i = 0 ; i < Math.floor(this.num) ; i++) {
        this.starList.push('star');
      }
    } else {
      this.starList = [];
      for (let i = 0 ; i < this.num ; i++) {
        this.starList.push('star');
      }
    }
  }

}
