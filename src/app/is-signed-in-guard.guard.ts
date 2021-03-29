import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    public fireauth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
     return new Promise(
       (resolve, reject) => {
         this.fireauth.auth.onAuthStateChanged(
           (user) => {
             if(user) {
               resolve(true);
             } else {
               this.router.navigate(['signin']);
               resolve(false);
             }
           }
         );
       }
     );
   }
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userSrv.getConnectedUser()) {
        alert("connectedUser true");
        return true;
      } else {
        alert("connectedUser false");
         this._router.navigate([""]);
        return false;
      }
  }*/

}
