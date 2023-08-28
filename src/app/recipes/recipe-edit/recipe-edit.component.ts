import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
   id!: number;
   editMode = false;
   recipeForm: FormGroup;
   // validationString: string = `/^[1-9]+[0-9]*$/`;

   constructor(
      private activatedRout: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router
   ) {}
   
   ngOnInit(): void {
      this.getParamsFromRout();
   }

   getParamsFromRout() {
      this.activatedRout.params.subscribe(
         (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.createform();
         }
      )
   }

   createform(){
      let recipeName: string = '';
      let recipeimagePath: string = '';
      let recipeDescription: string = '';
      let recipeIngridient = new FormArray([]);

      if (this.editMode) {
         const recipe: Recipe = this.recipeService.getRecipe(this.id);
         recipeName = recipe.name;
         recipeimagePath = recipe.imagePath;
         recipeDescription = recipe.description;
         if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
               recipeIngridient.push(
                  new FormGroup({
                     'name': new FormControl(ingredient.name, Validators.required),
                     'amount': new FormControl(ingredient.amount, [
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/)
                     ])
                  })
               )
            }
         }
      }

      this.recipeForm = new FormGroup({
         'name': new FormControl(recipeName, Validators.required),
         'description': new FormControl(recipeDescription, Validators.required),
         'imagePath': new FormControl(recipeimagePath, Validators.required),
         'ingredients': recipeIngridient
      })
   }

   onCansel() {
      this.router.navigate(['../'], {relativeTo: this.activatedRout});
   }

   onSubmit() {
   /* first way hou I can pass the data 
      const newRecipe = new Recipe(
            this.recipeForm.value['recipeName'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['recipeIngridient'], );
   */ //second way will be only pass te recipeform.value 
      if (this.editMode) {
         this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
         this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.onCansel()
   }

   get controls() { 
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   }

   onAddIngridient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            'name': new FormControl(null,  Validators.required),
            'amount': new FormControl(null, [
               Validators.required,
               Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
         })
      )
   }

   onDeleteIngridient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
   }
}
