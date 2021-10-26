import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlePrevComponent} from "./article-prev.component";
import {RouterModule} from "@angular/router";
import {SpinnerComponentModule} from "../../common/spinner/spinner.module";

@NgModule({
  declarations: [ArticlePrevComponent],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerComponentModule
  ],
  exports: [ArticlePrevComponent]
})
export class ArticlePrevComponentModule { }
