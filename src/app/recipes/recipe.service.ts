import { EventEmitter, Injectable } from '@angular/core'
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListSrvice } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
   // recipeSelected = new Subject<Recipe>();
   // recipeSelected = new EventEmitter<Recipe>();
   recipesChanged = new Subject<Recipe[]>();
   private recipes: Recipe[] = [];

   // private recipes: Recipe[] = [
   //    new Recipe(
   //       'Tasty Shnitzel',
   //       'Super tasty shnitzel - just awesome',
   //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
   //       [
   //          new Ingredient('Meat', 1),
   //          new Ingredient('Franch Fries', 20),
   //          new Ingredient('Lemon', 2)
   //       ]),
   //    new Recipe(
   //       'Big Fat Burger',
   //       'what else you need to say', 
   //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
   //       [
   //          new Ingredient('Meat', 1),
   //          new Ingredient('Buns', 2),
   //          new Ingredient('Onion', 2)
   //       ]),
   //    new Recipe(
   //       'Borshch',
   //       'better food from Ukraine ', 
   //       'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Borscht_at_White_Nights%2C_Beijing_%2820201023130446%29.jpg/800px-Borscht_at_White_Nights%2C_Beijing_%2820201023130446%29.jpg?20201023172609d',
   //       [
   //          new Ingredient('Meat', 1),
   //          new Ingredient('Potato', 2),
   //          new Ingredient('Onion', 2),
   //          new Ingredient('Beets', 2)
   //       ])   
   // ];

   constructor(
      private slService: ShoppingListSrvice
   ) {}

   setRecipes( recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
   }

   getRecipes() {
      return this.recipes.slice();
   }

   getRecipe(index: number): any {
      return this.recipes[index];
   }

   addIngredientsToShoppingList(ingredient: Ingredient[]) {
      this.slService.addIngridients(ingredient);
   }

   addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
   }

   updateRecipe(id: number, newRecipe: Recipe) {
      this.recipes[id] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
   }

   deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
   }
}