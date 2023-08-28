import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs"

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStoregeService {

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService
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