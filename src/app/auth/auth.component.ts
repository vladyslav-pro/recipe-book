import { Component, 
   ComponentFactoryResolver, ComponentRef, //only example
   OnDestroy, 
   OnInit, 
   ViewChild 
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
/*
   @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; // only example
   private closeSub: Subscription;
*/

   @ViewChild('authForm') authForm: NgForm; 
   isLoginMode = true;
   isLoading = false;
   error:string = null;

   constructor(
      private authService: AuthService,
      private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver // only example
   ) {}

   ngOnInit(){
      
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
            //example 
            // this.showErrorAlert(errorMessege);
            this.isLoading = false;
         }
      );

      console.log(form.value)
      form.reset()
   }

   onHandleError() {
      this.error = null;
   }
/*
   //create alert message from code, only Example
   private showErrorAlert (message: string) {
      const alertCompFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const compRef = hostViewContainerRef.createComponent(alertCompFactory);
      compRef.instance.message = message;
      this.closeSub = compRef.instance.close.subscribe(() => {
         this.closeSub.unsubscribe();
         hostViewContainerRef.clear();
      })
   }
*/
   ngOnDestroy() {
/*      if (this.closeSub) {
         this.closeSub.unsubscribe();
      }*/
   }


}