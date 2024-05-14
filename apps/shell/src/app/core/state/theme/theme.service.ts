import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {ThemeType} from "./theme.reducer";
import {Store} from "@ngrx/store";
import {updateTheme} from "./theme.actions";
// import { constructor } from "cypress";

@Injectable({providedIn: 'root'})
export class ThemeService {

  static readonly THEME_MAP: { [key: string]: string } = {
    LIGHT: 'light',
    BLUE: 'blue',
    DARK: 'dark',
  };
  private readonly LOCAL_STORAGE_KEY = 'theme';

  constructor(
    private themeStore: Store<ThemeType>,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  initTheme(): void {
    const localStorageTheme = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localStorageTheme && ThemeService.THEME_MAP[localStorageTheme]) {
      const themeEnum = (ThemeType as never)[localStorageTheme];
      this.setTheme(themeEnum);
    } else {
      this.setTheme(ThemeType.LIGHT);
    }
  }

  setTheme(themeType: ThemeType): void {
    this.document.getElementById('theme-link')?.setAttribute(
      'href', `assets/themes/${ThemeService.THEME_MAP[themeType]}/theme.css`
    );
    this.document.body.classList.remove(ThemeType.LIGHT, ThemeType.BLUE, ThemeType.DARK);
    this.document.body.classList.add(themeType);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, themeType);
    this.themeStore.dispatch(updateTheme({newTheme: themeType}));
  }

}

export function themeInitializer(themeService: ThemeService): () => void {
  return () => themeService.initTheme();
}

// export class ThemeService {
//
//   constructor(@Inject(DOCUMENT) private document: Document) {
//   }
//
//   switchTheme(theme: string) {
//     const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
//
//     if (themeLink) {
//       themeLink.href = theme + '.css';
//     }
//   }
// }
