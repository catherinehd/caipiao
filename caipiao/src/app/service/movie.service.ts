import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MovieService {

  constructor(private httpService: HttpService) { }

  getMovieList(key, page) {
    return this.httpService.getMethod({
      url: 'Critique/GetMovies',
      data: {
        keyword: key,
        page: page,
      }
    });
  }

  getMovieDedail(id) {
    return this.httpService.getMethod( {
      url: 'Critique/GetMovieInfo',
      data: {
        id: id,
      }
    });
  }

  getMovieComment(args) {
    return this.httpService.getMethod( {
      url: 'Critique/GetMovieComments',
      data: {
        comment_args: args,
      }
    });
  }

  write(mobile, category, comment) {
    return this.httpService.getMethod({
      url: 'Critique/Comment',
      data: {
        mobile: mobile,
        category: category,
        comment: comment,
      }
    });
  }
}
