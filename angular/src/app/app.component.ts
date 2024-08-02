import {Component, OnInit, NgZone, EnvironmentInjector} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { callbackUri } from './auth.config';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private ngZone: NgZone, public environmentInjector: EnvironmentInjector, private router: Router) {}

  ngOnInit(): void {
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          console.log('callback handling', url);

          if (
            // url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {


            // working version - browser closed first
            // but we see the app navigating
            //
            // Browser.close().then( () => {
            //   this.auth
            //     .handleRedirectCallback(url)
            //     .subscribe();
            // })


            // this doesn't work, so it doesn't seem to be a timing issue
            //
            // setTimeout(() => {
            //   this.auth
            //     .handleRedirectCallback(url)
            //     .pipe(mergeMap(() => Browser.close()))
            //     .subscribe();
            // }, 1000);

              this.auth
                .handleRedirectCallback(url)
                .subscribe(() => Browser.close());



            // broken version from the repo
            //
            //   this.auth
            //     .handleRedirectCallback(url)
            //     .pipe(mergeMap(() => Browser.close()))
            //     .subscribe();


          } else {
            Browser.close();
          }
        } else {
          // opened with custom URL scheme
          console.log('custom URL scheme navigation', url);
          const [protocol, path] = url.split('://');
          this.router.navigateByUrl('/' + path)
        }
      });
    });
  }
}
