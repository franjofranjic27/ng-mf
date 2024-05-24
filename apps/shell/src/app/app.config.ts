import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Provider } from "@angular/core";
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { themeReducer } from "./core/state/theme/theme.reducer";
import { languageReducer } from "./core/state/language/language.reducer";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { themeInitializer, ThemeService } from "./core/state/theme/theme.service";
import { languageInitializer, LanguageService } from "./core/state/language/language.service";
import { ConfirmationService, MessageService } from "primeng/api";

// const ThemeProvider: Provider = {
//   provide: APP_INITIALIZER,
//   useFactory: themeInitializer,
//   deps: [ThemeService],
//   multi: true
// }

const LanguageProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: languageInitializer,
  deps: [LanguageService],
  multi: true
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(appRoutes),
    provideAnimations(),
    LanguageProvider,
    MessageService,
    ConfirmationService,
    // ThemeProvider,
    provideStore({language: languageReducer, theme: themeReducer}),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
  ],
};
