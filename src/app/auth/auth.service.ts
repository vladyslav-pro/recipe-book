import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, Subject, tap } from "rxjs";
import { UserModel } from "./user.model";

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
      /*
      [API_key  AIzaSyA6L4_oOmeITyqsnFDKbiZTKLE9bDTls8U]
   */
   user = new Subject<UserModel>();

   constructor(
      private http: HttpClient
   ) {}

   signup (
      email: string,
      password: string
   ) {
      return this.http.post<AuthResponseData>(
         // 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/singnupNewUser?key=AIzaSyA6L4_oOmeITyqsnFDKbiZTKLE9bDTls8U',
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6L4_oOmeITyqsnFDKbiZTKLE9bDTls8U',
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
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6L4_oOmeITyqsnFDKbiZTKLE9bDTls8U',
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
         this.user.next(user)
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