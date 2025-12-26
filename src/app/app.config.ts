import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth';
import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '575184160466-1roir0tpclglg6jgee329l32q7svu500.apps.googleusercontent.com',
              {
                oneTapEnabled: false, // Disable One Tap to avoid FedCM issues
                prompt: 'select_account' // Always show account selector
              }
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    importProvidersFrom(SocialLoginModule),
  ]
};
