import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   // @Input() recipe!: Recipe;
    recipe: Recipe;
    id!: number;

   constructor(
      private recipeService: RecipeService, 
      private activatedRoute: ActivatedRoute,
      private router: Router
   ) { }

   ngOnInit() {
      // const id = +this.activatedRoute.snapshot.params['id']
      this.activatedRoute.params.subscribe(
         (params: Params) => {
            this.id = +params['id']
            this.recipe = this.recipeService.getRecipe(this.id)
         }
      )
   }

   onAddToShopingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
   }

   onEditRecipe() {
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
      // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute})
   }

   onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipies']);
   }

}
