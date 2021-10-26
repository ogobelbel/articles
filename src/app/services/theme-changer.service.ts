import { Injectable} from '@angular/core';
import { AuthCheckGuard } from './auth-check.guard';
import { Store } from '@ngrx/store';
import { previewSelectors } from '../reducers/preview.selectors';
import {THEME} from "./theme.constants";

@Injectable({ providedIn: 'root' })

export class ThemeChanger {
  themeInformation = {
    currentTheme:  localStorage.getItem('theme') || 'light',
    nextTheme:  !localStorage.getItem('theme') || localStorage.getItem('theme') === 'light' ? 'dark' : 'light',
    isThemeChecked: !( localStorage.getItem('theme') === 'light') && !!localStorage.getItem('theme')
  }

  constructor(private store: Store, public auth: AuthCheckGuard) {
    // this.store.select(previewSelectors.theme).subscribe((el)=> this.theme = el)
    if(localStorage.getItem('theme'))
      this.toggleTheme(this.themeInformation.isThemeChecked)
  }

  updateThemeParameters(newTheme: string, nextTheme: string) {
    this.themeInformation.currentTheme = newTheme;
    this.themeInformation.nextTheme = nextTheme
    localStorage.setItem('theme', newTheme)
  }

  toggleTheme(isChecked: boolean) {
    isChecked ? this.updateThemeParameters('dark', 'light')
      : this.updateThemeParameters('light', 'dark');

    const theme = THEME[this.themeInformation.currentTheme];
    for (let color in theme) {
      document.documentElement.style.setProperty(color, theme[color]);
    }
  }
}
