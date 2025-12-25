import { Routes } from '@angular/router';
import { adminGuardTsGuard } from './core/guards/admin-guard.ts-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Auth Module: Login, Register, Change Password
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Flight Module: Search and Booking
  {
    path: 'flights',
    loadChildren: () => import('./modules/flight/flight.routes').then(m => m.FLIGHT_ROUTES)
  },

  // User Module: Profile and History
  {
    path: 'profile',
    loadChildren: () => import('./modules/user/user.routes').then(m => m.USER_ROUTES)
  },

  // Admin Module: Guarded by AdminGuard
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [adminGuardTsGuard]
  },

  // Fallback for unknown routes
  { path: '**', redirectTo: 'auth/login' }
];
