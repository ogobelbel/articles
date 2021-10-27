import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecommendationBlockComponent} from "./recommendation-block.component";
import {ArticlePrevComponentModule} from "../main-page/article-prev/article-prev-component.module";
import {recommendationsFilterPipe} from "./recommendations-filter.pipe";



@NgModule({
  declarations: [RecommendationBlockComponent],
  imports: [
    CommonModule,
    ArticlePrevComponentModule
  ],
  exports: [RecommendationBlockComponent],
  providers: [recommendationsFilterPipe]
})
export class RecommendationBlockModule { }
