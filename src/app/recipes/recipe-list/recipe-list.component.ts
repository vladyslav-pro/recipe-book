import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
   recipes: Recipe[] = [];
   recipesChange: Subscription;

   constructor(
      private recipeService: RecipeService,
      private router: Router,
      private activatedRouter: ActivatedRoute
   ) { }

   ngOnInit() {
      this.recipesChange = this.recipeService.recipesChanged.subscribe(
         (recipes: Recipe[]) => {
            this.recipes = recipes;
         }
      )
      this.recipes = this.recipeService.getRecipes();
   }

   onNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.activatedRouter})
   }

   ngOnDestroy(): void {
      this.recipesChange.unsubscribe();
   }

}
