import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuardGuard implements CanActivate {

  constructor(
    private _router: Router,
    private userSrv: UserService
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userSrv.getConnectedUser()) {
        return true;
      } else {
         this._router.navigate([""]);
        return false;
      }
  }

}
