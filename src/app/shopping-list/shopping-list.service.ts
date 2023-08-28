import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model'

@Injectable()
export class ShoppingListSrvice {
   ingredieentsChange = new Subject<Ingredient[]>();
   shoppinItemEdit = new Subject<number>()
   // ingredieentsChange = new EventEmitter<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
   ];

   getIngredients() {
      return this.ingredients.slice();
   }

   getIngridient(index: number): Ingredient {
      return this.ingredients[index]
   }

   addIngridient(value: Ingredient) {
      this.ingredients.push(value);
      this.ingredieentsChange.next(this.ingredients.slice());
      // this.ingredieentsChange.emit(this.ingredients.slice());
   }

   addIngridients(ingridients: Ingredient[]) {
      // for( let ingridient of ingridients) {
      //    this.addIngridient(ingridient)
      // }
      this.ingredients.push(...ingridients);
      this.ingredieentsChange.next(this.ingredients.slice());
      // this.ingredieentsChange.emit(this.ingredients.slice());
   }

   updaateIngridient(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredieentsChange.next(this.ingredients.slice());
   }

   deleteIngradients(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredieentsChange.next(this.ingredients.slice());
   }

}