import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ChangePassword } from './pages/change-password/change-password';
import { LoginForm } from './containers/login-form/login-form';
import { RegisterForm } from './containers/register-form/register-form';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    RouterModule,
    Login,
    Register,
    ChangePassword,
    LoginForm,
    RegisterForm
  ],
  exports:[
    Login,
    Register,
    ChangePassword
  ]
})
export class AuthModule { }
