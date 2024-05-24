import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/state/language/language.service';
import { concatMap, Observable, of } from 'rxjs';
import { ThemeState, ThemeType } from '../../core/state/theme/theme.reducer';
import {
  LanguageState,
  LanguageType,
} from '../../core/state/language/language.reducer';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../core/state/theme/theme.service';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectLanguage } from '../../core/state/language/language.actions';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    PanelMenuModule,
    FormsModule,
    StyleClassModule,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent implements OnInit {
  private readonly MENU_ITEMS = [
    {
      label: 'menu.dashboard',
      routerLink: '/dashboard',
    },
    {
      label: 'menu.address',
      routerLink: '/address',
    },
  ];
  private readonly LANGUAGES = [
    { label: 'language.de', value: LanguageType.de },
    { label: 'language.fr', value: LanguageType.fr },
    { label: 'language.it', value: LanguageType.it },
  ];
  private readonly THEMES = [
    { label: 'theme.light', value: ThemeType.LIGHT },
    { label: 'theme.blue', value: ThemeType.BLUE },
    { label: 'theme.dark', value: ThemeType.DARK },
  ];

  menuItems$!: Observable<MenuItem[]>;
  languages$!: Observable<{ [key: string]: string }[]>;
  language$!: Observable<any>;
  themes$!: Observable<{ [key: string]: string }[]>;
  theme$!: Observable<any>;

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private languageStore: Store<LanguageState>,
    private themeStore: Store<ThemeState>
  ) {}

  ngOnInit(): void {
    this.theme$ = this.themeStore.select('theme');
    this.language$ = this.languageStore.select('language');
    this.theme$ = this.themeStore.select('theme');

    this.initMenuItems();
    this.initLanguages();
    this.initThemes();
  }

  private initMenuItems(): void {
    this.menuItems$ = this.language$.pipe(
      map(() => {
        return this.MENU_ITEMS.map(this.menuItemsMapper) as MenuItem[];
      })
    );
  }

  private menuItemsMapper = (item: MenuItem) => {
    const subMenuTrans = item.items?.map((subMenu) => ({
      ...subMenu,
      label: this.translateService.instant(subMenu.label || ''),
    }));
    return {
      ...item,
      label: this.translateService.instant(item.label || ''),
      items: subMenuTrans,
    };
  };

  private initLanguages(): void {
    this.languages$ = this.language$.pipe(
      map(() => {
        return this.LANGUAGES.map((item) => ({
          ...item,
          label: this.translateService.instant(item.label),
        }));
      })
    );
  }

  private initThemes(): void {
    // Combine store observable with translateService using concatMap
    this.themes$ = this.languageStore.pipe(
      select(selectLanguage), // Get the current language observable
      concatMap((language) => {
        // Translate theme labels based on the selected language
        return of(
          this.THEMES.map((item) => ({
            ...item,
            label: this.translateService.instant(item.label, {
              lang: language,
            }),
          }))
        );
      })
    );
  }

  setTheme({ value }: { originalEvent: Event; value: ThemeType }): void {
    this.themeService.setTheme(value);
  }

  setLanguage({ value }: { originalEvent: Event; value: LanguageType }): void {
    this.languageService.setLanguage(value);
  }
}
