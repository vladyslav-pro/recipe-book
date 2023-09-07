import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";

const shoppingListRoutes: Routes = [
   { path: '', component: ShoppingListComponent}
]

@NgModule({
   declarations: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ],
   imports: [
      RouterModule.forChild(shoppingListRoutes),
      FormsModule,
      SharedModule,
   ],
   /* the same  moment when use routing
   exports: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ]
   */
})
export class ShoppingListModule {}