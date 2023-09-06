import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

const shoppingListRoutes: Routes = [
   { path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
   declarations: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ],
   imports: [
      CommonModule,
      RouterModule.forChild(shoppingListRoutes),
      FormsModule
   ],
   /* the same  moment when use routing
   exports: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ]
   */
})
export class ShoppingListModule {}