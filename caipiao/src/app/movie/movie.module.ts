import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { MovieRoutingModule } from './movie-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

import { MovieService } from '../service/movie.service';

@NgModule({
  imports: [ MovieRoutingModule, SharedModule, FormsModule ],
  declarations: [
    IndexComponent,
    MovieDetailComponent
  ],
   providers: [ MovieService ]
})
export class MovieModule { }
