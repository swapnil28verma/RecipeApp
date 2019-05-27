import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {RecipeDto} from '../model/recipe-dto';
import {Router} from '@angular/router';
import {Alert} from 'selenium-webdriver';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  recipes: RecipeDto[];

  constructor(private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {

    this.getRecipes();
    console.log(this.recipes);
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  recipeCardClickHandler(recipe: RecipeDto) {
    console.log('RecipeDto card clicked for ' + recipe.id);
    this.router.navigate(['/recipe-details', recipe.id]);
  }

  toggleFavourite(event, recipe: RecipeDto) {
    this.recipeService.setAsFavourite(recipe.id).subscribe(
      (value: boolean) => {
        if (value === true) {
          recipe = this.getRecipeFromId(recipe.id);
          recipe.favourite = !recipe.favourite;
        } else {
          console.log('set as favourite failed');
        }
      },
      () => {
        console.log('something went wrong');
      }
    );
    event.stopPropagation();
  }

  getRecipeFromId(id: number): RecipeDto {
    let matchedRecipe: RecipeDto;
    this.recipes.forEach(recipe => {
      if (recipe.id === id) {
        matchedRecipe = recipe;
      }
    });
    return matchedRecipe;
  }
}
