import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl', '../../movie/index/index.component.styl', '../../hotel/index/index.component.styl']
})
export class IndexComponent implements OnInit {

  modal = {
    isConfirmModalShow: false,
    confirmMsg: '您确定要清空历史吗？'
  };
  constructor() { }

  ngOnInit() {
  }

  confirm(status) {
    if (status) {
      // this.logout();
    }
    this.modal.isConfirmModalShow = false;
  }

}
