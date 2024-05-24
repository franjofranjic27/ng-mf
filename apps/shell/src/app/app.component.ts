import { Component, OnInit } from "@angular/core";
import { RouterModule } from '@angular/router';
import { LayoutModule } from "./layout/layout.module";
import { PrimeNGConfig } from "primeng/api";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  // theme: string = 'lara-light-indigo';

  // dark: boolean = false;
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  // changeTheme(event: Event, theme: string, dark: boolean) {
  //   const themeElement = document.getElementById('theme-link');
  //   // @ts-ignore
  //   themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.theme, theme));
  //   this.theme = theme;
  //   this.dark = dark;
  //   // @ts-ignore
  //   console.log(themeElement.getAttribute('href'));
  //   event.preventDefault();
  // }
}
