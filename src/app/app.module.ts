import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListSrvice } from './shopping-list/shopping-list.service'
import { AppRoutingModule } from './app-routing.module';
import { DataStoregeService } from './shared/data-storege.service'
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { LoadingSpiner } from './shared/loading-spiner/loading-spiner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shoppig-list.module';


export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpiner,
    AlertComponent,
    PlaceholderDirective, // only for examle
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
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
