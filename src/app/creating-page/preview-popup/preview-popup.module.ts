import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreviewPopupComponent} from "./preview-popup.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerComponentModule} from "../../common/spinner/spinner.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [PreviewPopupComponent],
  imports: [
    CommonModule,
    SpinnerComponentModule,
    RouterModule
  ],
  exports: [PreviewPopupComponent]
})
export class PreviewPopupModule { }
