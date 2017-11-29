import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {
   newsList: any[];

  isCompleted = false;
  isPageLoading = true;
  isLoading: boolean;
  pageIndex: number;

  constructor(private navigateService: NavigateService,
              private newsService: NewsService) {
    this.pageIndex = 0;
    this.newsList = [];
  }

  ngOnInit() {
    this.newsService.getNewsList('最新' , 0).subscribe( res => {
      this.newsList = res.json();
      for (let i = 0 ; i < this.newsList.length; i++) {
        this.newsList[i].path = this.newsList[i].path.replace(/\//g, '\\');
      }
    });
  }

  setNewsList(data) {
    this.isPageLoading = false;
    this.isLoading = false;
    if (data.json().length === 0) {
      this.isCompleted = true;
      alert('没有更多了');
    } else {
      this.isCompleted = false;
    }
    const that = this;
    this.newsList = this.newsList.concat(data.json());
    for (let i = 0 ; i < this.newsList.length; i++) {
      this.newsList[i].path = this.newsList[i].path.replace(/\//g, '\\');
    }
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  getList(pagenum) {
    this.newsService.getNewsList( '最新' , this.pageIndex).subscribe(res => {
      this.setNewsList(res);
    });
  }

  canLoad() {
    console.log('a');
    this.isLoading = true;
    this.getList(this.pageIndex = this.pageIndex + 1);
  }

}
