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

  constructor(private navigateService: NavigateService,
              private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovieList('' , 1).subscribe( res => {
      this.movieList = res.json();
    });
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }


}
