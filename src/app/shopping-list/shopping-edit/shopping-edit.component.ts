import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListSrvice } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
   @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;

   validationString: string = '^[1-9]+[0-9]*$';
   shoppinItemEdit: Subscription;
   editMode:boolean = false;
   editItemIndex: number;
   editedItem: Ingredient;

   constructor(
      private shoppingListService: ShoppingListSrvice
   ) { }

   ngOnInit() {
      this.createForm();
   }

   createForm() {
      this.shoppinItemEdit = this.shoppingListService.shoppinItemEdit.subscribe(
         (index: number) => {
            this.editItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngridient(index);
            this.editItem(this.editedItem.name, this.editedItem.amount)
         }
      );
   }

   editItem(itemName: string, itemAmount: number) {
      this.shoppingItemForm.setValue({
         shoppingItemName: itemName,
         shoppingItemAmount: itemAmount
      })
   }

   updateIngridient(indexIngridient: number, newIngridient: Ingredient) {
         this.shoppingListService.updaateIngridient(indexIngridient, newIngridient);
   }

   onSubmit(form: NgForm) {
      const valueForm = form.value;
      const newIngredient = new Ingredient(valueForm.shoppingItemName, valueForm.shoppingItemAmount);

      if (this.editMode) {
         this.updateIngridient(this.editItemIndex, newIngredient);
      } else { 
         this.shoppingListService.addIngridient(newIngredient);
      }
      this.editMode = false;
      this.shoppingItemForm.reset();
   }

   onClear() {
      this.editMode = false;
      this.shoppingItemForm.reset();
   }

   onDeleteItem() {
      this.shoppingListService.deleteIngradients(this.editItemIndex);
      this.onClear();
   }

   ngOnDestroy(): void {
      this.shoppinItemEdit.unsubscribe();
   }
/* get value from input field in bsic
   @ViewChild('nameInput') nameInputRef!: ElementRef;
   @ViewChild('amountInput') amountInputRef!: ElementRef;

   onAdditem(item:NgForm) {
      const ingName = this.nameInputRef.nativeElement.value;
      const ingAmount = this.amountInputRef.nativeElement.value;
      const newIngredient = new Ingredient(ingName, ingAmount);
      this.shoppingListService.addIngridient(newIngredient);

      this.nameInputRef.nativeElement.value = '';
      this.amountInputRef.nativeElement.value = '';
   }
*/
}
