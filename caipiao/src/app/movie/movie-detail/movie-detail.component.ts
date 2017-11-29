import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.styl']
})
export class MovieDetailComponent implements OnInit {
  movieDetail: any;
  commentList: any[];

  movieName: string;
  score: string;
  targets: string;
  times: string;
  upTime: string;
  profile: string;
  args: string;
  moviePic: string;

  constructor(private navigateService: NavigateService,
              private activatedRoute: ActivatedRoute,
              private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovieDedail( this.activatedRoute.snapshot.params.id ).subscribe( res => {
      this.movieName = res.json().movie_name;
      this.score = res.json().movie_score;
      this.targets = res.json().targets;
      this.times = res.json().times;
      this.upTime = res.json().upTime;
      this.profile = res.json().profile;
      this.args = res.json().comment_args;
      this.moviePic = res.json().movie_pic;

      this.movieService.getMovieComment( this.args ).subscribe( res => {
        this.commentList = res.json();
      });
    });
  }

}
