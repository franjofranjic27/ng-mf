import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule('dashboard', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'address',
    loadChildren: () =>
      loadRemoteModule('address', './Routes').then((m) => m.remoteRoutes),
  },
];
