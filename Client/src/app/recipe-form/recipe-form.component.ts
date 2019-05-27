import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeDto} from '../model/recipe-dto';
import {RecipeService} from '../recipe.service';
import { Location } from '@angular/common';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private recipeService: RecipeService) { }

  recipe: RecipeDto;
  type: string;

  @ViewChild('recipeForm') recipeForm: NgForm;

  formLbl: string;

  ngOnInit() {

    this.recipe = this.recipeService.getRoutedRecipe();
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type === 'edit') {
      this.formLbl = 'Edit Recipe!';
      this.recipe = this.recipeService.getRoutedRecipe();
    } else if (this.type === 'new') {
      this.formLbl = 'Create New Recipe!';
      this.recipe = null;
    }

    console.log(this.formLbl);

    // if (this.recipe !== null) {
    //   this.recipeForm.form.patchValue({descriptionField: this.recipe.description,
    //     imageField: this.recipe.image_url,
    //     favourite: this.recipe.favourite,
    //     vegetarian: this.recipe.vegetarian,
    //     titleField: this.recipe.title});
    // }
    //
    // console.log(this.recipeForm.form.controls.descriptionField.value);
  }


  formSubmitClickHandler(form: NgForm) {

    this.recipe = {id: this.recipe === null ? -1 : this.recipe.id,
      title: form.form.controls.titleField.value,
      description: form.form.controls.descriptionField.value,
      image_url: form.form.controls.imageField.value,
      favourite: form.form.controls.favouriteCheckBox.value === undefined ? false : form.form.controls.favouriteCheckBox.value,
      vegetarian: form.form.controls.vegetarianCheckBox.value === undefined ? false : form.form.controls.vegetarianCheckBox.value};

    if (this.type === 'edit') {
      this.editRecipe();
    } else if (this.type === 'new') {
      this.createNewRecipe();
    }
  }

  createNewRecipe() {
    this.recipeService.createRecipe(this.recipe).subscribe(
      (value: boolean) => {
        if (value === true) {
          this.location.back();
        } else {
          console.log('create new recipe failed');
        }
      },
      () => {
        console.log('something went wrong');
      }
    );
  }

  editRecipe() {
    this.recipeService.editRecipe(this.recipe, this.recipe.id).subscribe(
      (value: boolean) => {
        if (value === true) {
          this.location.back();
        } else {
          console.log('edit recipe failed');
        }
      },
      () => {
        console.log('something went wrong');
      }
    );
  }
}

