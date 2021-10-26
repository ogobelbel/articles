import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatingPageComponent} from "./creating-page.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormTagsModule} from "./form-tags/form-tags.module";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatChipsModule} from "@angular/material/chips";
import {CreatingPageRoutingModule} from "./creating-page-routing.module";

@NgModule({
  declarations: [CreatingPageComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormTagsModule,
    ReactiveFormsModule,
    RouterModule,
    CreatingPageRoutingModule
  ],
  exports: [CreatingPageComponent],
  providers: [FormBuilder]
})
export class CreatingPageModule {

}
