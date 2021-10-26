import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {CreatingPageComponent} from '../creating-page/creating-page.component';
import {ArticleData} from '../main-page/article-prev/article-prev.component';
import {previewSelectors} from '../reducers/preview.selectors';
import {AuthCheckGuard} from './auth-check.guard';

@Injectable({providedIn: 'root'})

export class CanDeactivateForm implements CanDeactivate<CreatingPageComponent> {
  constructor(private dialog: MatDialog,
              public auth: AuthCheckGuard,
              private store: Store) {
    this.store.select(previewSelectors.previewData).subscribe((articleData) => this.articleData = articleData)
  }

  articleData!: ArticleData;

  canDeactivate(
    component: CreatingPageComponent
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((this?.auth?.userLogin && !component?.showPreview)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent)

      return dialogRef.afterClosed()
    }
    return true;
  }
}
