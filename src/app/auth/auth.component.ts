import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
   @ViewChild('authForm') authForm: NgForm; 
   isLoginMode = true;
   isLoading = false;
   error:string = null;

   constructor(
      private authService: AuthService,
      private router: Router,
   ) {}

   ngOnInit(): void {
      
   }

   onSwitcMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   onSubmit(form: NgForm) {
      if (!form.valid) {
         return;
      }

      const userEmail = form.value.authEmail;
      const userPassword = form.value.authPassword;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMode){
         authObs = this.authService.login(userEmail, userPassword);
      } else {
         authObs = this.authService.signup(userEmail, userPassword);
      }

      authObs.subscribe(
         responsData => {
            console.log(responsData);
            this.isLoading = false;
            this.router.navigate(['/recipes'])               
         }, errorMessege => {
            console.log(errorMessege);
            this.error = errorMessege;
            this.isLoading = false;
         }
      );

      console.log(form.value)
      form.reset()
   }

   ngOnDestroy(): void {
      
   }


}