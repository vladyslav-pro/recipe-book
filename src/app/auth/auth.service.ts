import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, tap, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import { UserModel } from "./user.model";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}

@Injectable()
export class AuthService {

   user = new BehaviorSubject<UserModel>(null);
   private tokenExpirationTimer: any

   constructor(
      private http: HttpClient,
      private router: Router
   ) {}

   signup (
      email: string,
      password: string
   ) {
      return this.http.post<AuthResponseData>(
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
         {
            email: email,
            password: password,
            returnSecureToken: true
         }
         ).pipe(
            catchError(this.hendleError),
            tap( respData => {
               this.hendleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
            }))
   }

   login(
      email: string, 
      password: string
      ) {
      return this.http.post<AuthResponseData>(
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
         {
            email: email,
            password: password,
            returnSecureToken: true
         }
      ).pipe(catchError(this.hendleError),
         tap( respData => {
            this.hendleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
         }))
   }

   autoLogin() {
      const userData: UserModel = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
         return;
      }

      const loadedUser = new UserModel(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
         )

         if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() ;
            this.autoLogout(expirationDuration);
         }
   }

   logout() {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');

      if (this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer)
      }
      this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number) {
      console.log(expirationDuration);
      
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration)
   }

   private hendleAuthentication(
         email: string, 
         userId: string,
         token: string, 
         expiresIn: number) {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
      const user = new UserModel(
         email,
         userId,
         token,
         expirationDate
         );
         this.user.next(user);
         this.autoLogout(expiresIn * 1000);
         localStorage.setItem('userData', JSON.stringify(user));
   }

   private hendleError(errorResponse: HttpErrorResponse) {
      let errorMessage = 'An unknown error';
         if (!errorResponse.error || !errorResponse.error.error.message) {
            return throwError(errorResponse);
         }
         switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
               errorMessage = 'This email is already use';
               break;
            case 'EMAIL_NOT_FOUND':
               errorMessage = 'This EMAIL_NOT_FOUND';
               break;
            case 'INVALID_PASSWORD':
               errorMessage = 'You has INVALID_PASSWORD';
               break
         }
         return throwError(errorMessage);
   }
}