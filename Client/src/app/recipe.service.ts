import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {RecipeDto} from './model/recipe-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  routedRecipe: RecipeDto;

  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<RecipeDto[]> {
    return this.httpClient.get<RecipeDto[]>('/recipe/get-all-recipe');
  }

  getSingleRecipe(id: number): Observable<RecipeDto> {
    return this.httpClient.get<RecipeDto>('/recipe/get-single-recipe/' + id);
  }

  setAsFavourite(id: number): Observable<boolean> {
    console.log('recipe-service: in setAsFavourite');
    return this.httpClient.put<boolean>('/recipe/favourite/' + id, {id});
  }

  createRecipe(recipe: RecipeDto): Observable<boolean> {
    return this.httpClient.post<boolean>('/recipe/create-recipe/', recipe);
  }

  editRecipe(recipe: RecipeDto, id: number): Observable<boolean> {
    return this.httpClient.put<boolean>('/recipe/edit-recipe/' + id, recipe);
  }

  deleteRecipe(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('/recipe/delete-recipe/' + id);
  }

  setRoutedRecipe(recipe: RecipeDto) {
    this.routedRecipe = recipe;
  }

  getRoutedRecipe(): RecipeDto {
    return this.routedRecipe;
  }
}
