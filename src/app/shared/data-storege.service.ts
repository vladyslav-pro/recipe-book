import { HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs"

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStoregeService {

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private authService: AuthService
   ) {}

   storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http
      .put(
         'https://angular-pet-project-d1c31-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
         recipes
      ).subscribe((response) => {
         console.log(response);               
      })
   }

   fetchData() {
      return this.http
      .get<Recipe[]>(
         'https://angular-pet-project-d1c31-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(map( recipes => {
         return recipes.map( recipe => {
            return {
               ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
               }
         })
      }),
      tap( recipes => {
         this.recipeService.setRecipes(recipes)               
      })
      )
      /*
      .subscribe((recipes) => {
         console.log(recipes);
         this.recipeService.setRecipes(recipes)               
      })*/
   }
}