import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

import { MovieService} from '../../service/movie.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {

  movieList: any[];

  isCompleted = false;
  isPageLoading = true;
  isLoading: boolean;
  pageIndex: number;

  constructor(private navigateService: NavigateService,
              private movieService: MovieService) {
    this.pageIndex = 0;
    this.movieList = [];
  }

  ngOnInit() {
    this.movieService.getMovieList('' , 0).subscribe( res => {
      this.movieList = res.json();
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
    this.movieList = this.movieList.concat(data.json());
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  getList(pagenum) {
    this.movieService.getMovieList( '' , this.pageIndex).subscribe(res => {
      this.setNewsList(res);
    });
  }

  canLoad() {
    console.log('a');
    this.isLoading = true;
    this.getList(this.pageIndex = this.pageIndex + 1);
  }

}
