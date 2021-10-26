import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatingPageComponent} from "./creating-page.component";

const routes: Routes = [{ path: '', component: CreatingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatingPageRoutingModule { }
