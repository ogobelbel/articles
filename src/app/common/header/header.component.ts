import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store';
import {AuthService, UserInfo} from '../../services/authentication.service';
import {previewSelectors} from 'src/app/reducers/preview.selectors';
import {ThemeChanger} from 'src/app/services/theme-changer.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit{
  constructor(private themeChanger: ThemeChanger,
              public auth: AuthService) {
    this.auth.userInfo$.subscribe((user) => this.userInfo = {
      userName: user?.userName,
      imgUrl: user?.imgUrl,
      userLog: user?.userLog
    })
  }

  userInfo!: UserInfo;
  theme;

  ngOnInit() {
   this.theme = this.themeChanger.themeInformation
  }

  googleLogin() {
    this.auth.googleLogin()
  }

  toggleTheme(isChecked: boolean) {
    this.themeChanger.toggleTheme(isChecked)
  }
}
