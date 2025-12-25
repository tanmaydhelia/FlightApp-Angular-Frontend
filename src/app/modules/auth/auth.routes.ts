import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ChangePassword } from "./pages/change-password/change-password";

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'change-password', component: ChangePassword }
];