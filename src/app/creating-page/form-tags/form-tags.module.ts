import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormTagsComponent} from "./form-tags.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [FormTagsComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [FormTagsComponent]
})
export class FormTagsModule { }
