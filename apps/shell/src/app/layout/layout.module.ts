import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HeaderComponent } from "./header/header.component";
import { SideNavigationComponent } from "./side-navigation/side-navigation.component";
import { StyleClassModule } from "primeng/styleclass";
import { RippleModule } from "primeng/ripple";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    ScrollTopModule,
    NgIf,
    SideNavigationComponent,
    ScrollTopModule,
    ToastModule,
    ConfirmDialogModule,
    CommonModule,
    ScrollTopModule,
    ToastModule,
    MenuModule,
    DropdownModule,
    BadgeModule,
    ConfirmDialogModule,
    TooltipModule,
    PanelMenuModule,
    HeaderComponent,
    SideNavigationComponent,
    StyleClassModule,
    RippleModule,
  ],
  exports: [LayoutComponent],
  bootstrap: [LayoutComponent],
})
export class LayoutModule {}
