import {Component, Input} from '@angular/core';
import {AuthService} from '../services/authentication.service';
import {AuthCheckGuard} from '../services/auth-check.guard';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  constructor(public auth: AuthCheckGuard,
              public authCheck: AuthService,
              private http: HttpClient) {
    authCheck.userInfo$.subscribe((user) => this.user = user?.userLog)
  }
  data1;
  data = this.getData().subscribe(value => this.data1 = value);
  user!: object | null | undefined
  @Input() isChecked = false;

  loginGoogle() {
    this.authCheck.googleLogin();
  }

  getData() { //testing get
   return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }
}
