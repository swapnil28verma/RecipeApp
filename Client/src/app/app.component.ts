import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,
              private recipeService: RecipeService) {
  }
  title = 'RecipeApp';

  newRecipeClickHandler() {
    this.recipeService.setRoutedRecipe(null);
    this.router.navigate(['create-new-recipe', 'new']);
  }

  aboutClickHandler() {
    this.router.navigate(['about']);
  }

  homePageClickHandler() {
    this.router.navigate(['']);
  }
}
