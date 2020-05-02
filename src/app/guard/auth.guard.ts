import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { FireauthService} from './../service/fireauth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: FireauthService, 
    private router: Router) {

  }
 
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
         take(1),
         map(user => !!user), // <-- map to boolean
         tap(loggedIn => {
           if (!loggedIn) {
             console.log('access denied')
             this.router.navigate(['/']);
           }
       })
  );
}
  
}
