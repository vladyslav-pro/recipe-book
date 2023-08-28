import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStoregeService } from "../shared/data-storege.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
   constructor(
      private dataStoregeService: DataStoregeService,
      private recipesService: RecipeService
   ) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipesService.getRecipes();

      if (recipes.length === 0) {
         return this.dataStoregeService.fetchData();
      } else {
         return recipes
      }
      
   }
}