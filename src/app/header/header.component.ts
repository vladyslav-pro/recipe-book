import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStoregeService } from '../shared/data-storege.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
   isAuthenticated = false;
   private user: Subscription;

   constructor(
      private dataStoregeService: DataStoregeService,
      private authService: AuthService,
   ) {}

   ngOnInit(): void {
      this.user = this.authService.user.subscribe(user => {
         // !!user
         this.isAuthenticated = !user ? false : true;
      });
   }

   onSaveData() {
      this.dataStoregeService.storeRecipes()
   }

   onFetchData() {
      this.dataStoregeService.fetchData().subscribe();
   }

   onLogout(){
      this.authService.logout()
   }

   ngOnDestroy(): void {
      this.user.unsubscribe();
   }
}
