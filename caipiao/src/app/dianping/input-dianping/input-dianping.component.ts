import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-dianping',
  templateUrl: './input-dianping.component.html',
  styleUrls: ['./input-dianping.component.styl']
})
export class InputDianpingComponent implements OnInit {
  modal = {
    isConfirmModalShow: false,
    confirmMsg: '确定要离开当前页面？离开后所填写的信息将不保存'
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
