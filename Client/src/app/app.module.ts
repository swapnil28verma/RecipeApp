import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RoutingModuleModule } from './routing-module.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import {FormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModuleModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
