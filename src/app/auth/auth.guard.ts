import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs";
import { inject } from "@angular/core";

import { AuthService } from "./auth.service";


export const authGuard: CanActivateFn = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const authService = inject(AuthService);
   const router = inject(Router);
   return authService.user.pipe(
      take(1),
      map( user => {
      const isAuth = !!user
      if (isAuth) {
         return true;
      }
      return router.createUrlTree(['/auth'])
   }))
}
/*
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private authService: AuthService
   ){}

   canActivate(
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot
         ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.user.pipe(map( user => {
         return !!user
      }))
   }
}
*/