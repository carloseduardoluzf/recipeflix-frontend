import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeFormRoutingModule } from './recipe-form-routing.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';


@NgModule({
  declarations: [
    RecipeFormComponent
  ],
  imports: [
    CommonModule,
    RecipeFormRoutingModule
  ]
})
export class RecipeFormModule { }
