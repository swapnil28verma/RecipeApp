import {Component, Input, OnInit} from '@angular/core';
import {RecipeDto} from '../model/recipe-dto';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input()recipe: RecipeDto;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {}

  ngOnInit() {
    this.getRecipeDetails();

  }

  getRecipeDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('inside getRecipeDetails with id ' + id);
    this.recipeService.getSingleRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  editButtonClickHandler() {
    this.recipeService.setRoutedRecipe(this.recipe);
    this.router.navigate(['edit-recipe', 'edit']);
  }

  deleteButtonClickHandler() {
    this.recipeService.deleteRecipe(this.recipe.id).subscribe(
      value => {
        if (value === true) {
          this.router.navigate(['recipe-list']);
        } else {
          console.log('Something went wrong.');
        }
      }
    );
  }

  favouriteButtonClickHandler(id: number) {
    this.recipeService.setAsFavourite(id).subscribe(
      (value: boolean) => {
        if (value === true) {
          this.recipe.favourite = !this.recipe.favourite;
        } else {
          console.log('set as favourite failed');
        }
      },
      () => {
        console.log('something went wrong');
      }
    );
  }
}
