import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FooterComponentModule} from "../footer/footer-component.module";
import {SpinnerComponentModule} from "../common/spinner/spinner.module";
import {EmptyStateModule} from "../common/empty-state/empty-state.module";
import {MainPageComponent} from "./main-page.component";
import {ArticlePrevComponentModule} from "./article-prev/article-prev-component.module";
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "./search-filter.pipe";

@NgModule({
  declarations: [MainPageComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FooterComponentModule,
    SpinnerComponentModule,
    EmptyStateModule,
    ArticlePrevComponentModule,
    FormsModule
  ],
  exports: [MainPageComponent],
  providers: [SearchFilterPipe]
})
export class MainPageModule { }
