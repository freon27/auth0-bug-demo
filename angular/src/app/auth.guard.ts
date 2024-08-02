import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {switchMap, tap} from "rxjs";
import {Capacitor} from "@capacitor/core";
import {Browser} from "@capacitor/browser";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.isAuthenticated$.pipe(
    tap((isAuthenticated) => {
      console.log('authGuard:');
      console.log('isAuthenticated', isAuthenticated);
      console.log('state.url', state.url);
    }),
    tap((isAuthenticated) => {

      if (!isAuthenticated) {
        const config = Capacitor.isNativePlatform()
          ? {
            async openUrl(url: string) {
              await Browser.open({ url, windowName: '_self' });
            },
            appState: { target: state.url },
          }
          : { appState: { target: state.url } };

        authService.loginWithRedirect(config);
      }
    }),
  );
};
