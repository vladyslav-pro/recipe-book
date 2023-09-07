import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListSrvice } from './shopping-list/shopping-list.service'
import { AppRoutingModule } from './app-routing.module';
import { DataStoregeService } from './shared/data-storege.service'
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';



export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
      httpInterceptorProviders,
      ShoppingListSrvice,
      RecipeService,
      DataStoregeService,
      RecipeResolverService,
      AuthService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
