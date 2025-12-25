import { Routes } from '@angular/router';
import { adminGuardTsGuard } from './core/guards/admin-guard.ts-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  {
    path: 'flights',
    loadChildren: () => import('./modules/flight/flight.routes').then(m => m.FLIGHT_ROUTES)
  },

  {
    path: 'profile',
    loadChildren: () => import('./modules/user/user.routes').then(m => m.USER_ROUTES)
  },

  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [adminGuardTsGuard]
  }
];
