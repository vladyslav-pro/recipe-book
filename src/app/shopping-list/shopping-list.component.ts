import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListSrvice } from './shopping-list.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
   ingredients: Ingredient[] = [];
   private igChangeSub!: Subscription

   constructor(
      private shoppingListService: ShoppingListSrvice
   ) { }

   ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients();
      
      this.igChangeSub = this.shoppingListService.ingredieentsChange
         .subscribe(
            (ingredients: Ingredient[]) => {
               this.ingredients = ingredients;
            }
         )
   }

   onEditItem(index: number) {
      this.shoppingListService.shoppinItemEdit.next(index)
   }

   ngOnDestroy(): void {
      this.igChangeSub.unsubscribe()
   }

}
