import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlePageComponent} from "./article-page.component";
import {SpinnerComponentModule} from "../common/spinner/spinner.module";
import {FooterComponentModule} from "../footer/footer-component.module";
import {RouterModule} from "@angular/router";
import {RecommendationBlockModule} from "../recomendation-block/recommendation-block.module";
import {ArticlePageRoutingModule} from "./article-page-routing.module";

@NgModule({
  declarations: [ArticlePageComponent],
  imports: [
    CommonModule,
    RecommendationBlockModule,
    SpinnerComponentModule,
    RouterModule,
    RecommendationBlockModule,
    FooterComponentModule,
    ArticlePageRoutingModule
  ],
  exports: [ArticlePageComponent]
})
export class ArticlePageModule { }
