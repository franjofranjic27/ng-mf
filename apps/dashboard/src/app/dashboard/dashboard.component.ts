import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MenuItem } from "primeng/api";
import { MenuModule } from "primeng/menu";
import { StyleClassModule } from "primeng/styleclass";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    StyleClassModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;

  public async ngOnInit() {
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }
}
