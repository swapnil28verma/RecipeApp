import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeCardComponent} from './recipe-card/recipe-card.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-list', pathMatch: 'full' },
  {path: 'recipe-list', component: RecipeCardComponent},
  {path: 'recipe-details/:id', component: RecipeDetailsComponent},
  {path: 'create-new-recipe/:type', component: RecipeFormComponent},
  {path: 'edit-recipe/:type', component: RecipeFormComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
