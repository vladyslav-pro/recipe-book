import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
   { path: '', redirectTo: '/recipe', pathMatch: 'full' },
   { 
      path: 'recipes',
      loadChildren: () => import ('./recipes/recipes.module')
         .then(m => m.RecipesModule)
   },
   { 
      path: 'shopping-list',
      loadChildren: () => import ('./shopping-list/shoppig-list.module')
         .then(m => m.ShoppingListModule)
   },
   { 
      path: 'auth',
      loadChildren: () => import ('./auth/auth.module')
         .then(m => m.AuthModule)
   }
]

@NgModule({
   imports: [
      RouterModule.forRoot(appRoutes)
   ],
   exports: [
      RouterModule
   ]
})
export class AppRoutingModule {}