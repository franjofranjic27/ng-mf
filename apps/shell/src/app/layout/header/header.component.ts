import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleSideNavigation = new EventEmitter<void>();

  constructor() {}

  onToggleSideNavigation(): void {
    this.toggleSideNavigation.emit();
  }
}
