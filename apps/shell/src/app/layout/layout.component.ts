import { Component, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { map, Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { LayoutOptionState } from "../core/state/layout-option/layout-option.reducer";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('navigationCollapse', [
      state('true', style({ overflow: 'hidden', 'margin-left': '-16rem' })),
      state('false', style({ overflow: '*', 'margin-left': '0' })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('250ms ease-out')),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  isWindowHeightLayout$!: Observable<boolean>;

  isNavigationCollapsed = true;
  contentClass$ = this.store.pipe(
    map((isFullWidthLayout) =>
      isFullWidthLayout ? 'content-full' : 'content p-pt-4 p-pb-4 p-pl-4 p-pr-4'
    )
  );

  constructor(private store: Store<LayoutOptionState>) {}

  items: MenuItem[] | undefined;

  public async ngOnInit() {
    this.isWindowHeightLayout$ = this.store.pipe(
      select((state) => state.isWindowHeightLayout) // Access the property from state
    );
  }

  toggleSideNavigation(): void {
    this.isNavigationCollapsed = !this.isNavigationCollapsed;
  }

  onClickOverlay(): void {
    this.isNavigationCollapsed = true;
  }
}
