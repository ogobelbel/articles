import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanLoad {
  constructor(public router: Router, public authCheck: AuthService) {
    this.authCheck.userInfo$.subscribe((user) => this.userLogin = user?.userLog)
  }
  userLogin!: object | null | undefined;
  canLoad(
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userLogin) {
      return true;
    }
    this.router.navigate([''])
    return false;
  }
}
