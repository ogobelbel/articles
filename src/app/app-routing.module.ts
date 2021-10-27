import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlePageComponent} from './article-page/article-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {CreatingPageComponent} from './creating-page/creating-page.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {PreloadAllModules} from '@angular/router';
import {AuthCheckGuard} from './services/auth-check.guard';
import {CanDeactivateForm} from './services/canDeacrivate.service';
import {UserResolver} from './services/resolver';
import {PreviewPopupComponent} from './creating-page/preview-popup/preview-popup.component';

const routes: Routes = [
  {
    path: 'creating',
    canLoad: [AuthCheckGuard],
    canDeactivate: [CanDeactivateForm],
    loadChildren: () => import('./creating-page/creating-page.module').then(m => m.CreatingPageModule),
    resolve: {users: UserResolver}
  },
  {path: 'autorization', component: AuthPageComponent},
  {path: 'article/:id', loadChildren: () => import('./article-page/article-page.module').then(m => m.ArticlePageModule)},
  {path: 'error', pathMatch: 'full', component: ErrorPageComponent},
  {
    path: 'creating/preview',
    component: PreviewPopupComponent,
    canLoad: [AuthCheckGuard],
    canDeactivate: [CanDeactivateForm]
  },
  {path: '', pathMatch: 'full', component: MainPageComponent},
  {path: '**', redirectTo: 'error'},
];

RouterModule.forRoot(
  routes,
  {
    preloadingStrategy: PreloadAllModules
  }
)

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
