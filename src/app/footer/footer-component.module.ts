import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterComponent]
})
export class FooterComponentModule { }
