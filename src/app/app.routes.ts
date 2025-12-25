import { Routes } from '@angular/router';
import { adminGuardTsGuard } from './core/guards/admin-guard.ts-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.Login) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./modules/auth/pages/register/register').then(m => m.Register) 
  },
  { 
    path: 'search', 
    loadComponent: () => import('./modules/flight/pages/search-flight/search-flight').then(m => m.SearchFlights) 
  },
  { 
    path: 'book/:id', 
    loadComponent: () => import('./modules/flight/pages/book-flight/book-flight').then(m => m.BookFlight) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./modules/user/pages/profile-page/profile').then(m => m.Profile) 
  },
  { 
    path: 'change-password', 
    loadComponent: () => import('./modules/auth/pages/change-password/change-password').then(m => m.ChangePassword) 
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./modules/admin/pages/admin-dashboard/admin-panel.component').then(m => m.AdminPanel),
    canActivate: [adminGuardTsGuard] 
  }
];
