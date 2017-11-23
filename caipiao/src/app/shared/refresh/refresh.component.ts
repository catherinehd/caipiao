import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.styl']
})
export class RefreshComponent implements OnInit {
  @ViewChild('refreshElem') refreshElem: HTMLElement;
  refreshTip: '下拉刷新';
  constructor() { }

  ngOnInit() {
  }

}
