import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthPageComponent} from "./auth-page.component";
import {FormsModule} from "@angular/forms";
import {FooterComponentModule} from "../footer/footer-component.module";



@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    FooterComponentModule
  ],
  exports: [AuthPageComponent]
})
export class AuthPageModule { }
