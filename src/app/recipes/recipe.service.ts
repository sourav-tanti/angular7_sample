import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Red Chili Sauce Pasta',
      'A new Pasta Recipe',
      'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
      [
        new Ingredient('Pasta', 1, 'packet'),
        new Ingredient('Masala', 1, 'packet'),
        new Ingredient('Red Chili Sauce', 300, 'ml')
      ]
    ),
    new Recipe(
      'Chicken Noodles',
      'Chicken Noodles',
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/07/15/chinese.jpg?w968h681',
      [
        new Ingredient('Chicken', 500, 'gm'),
        new Ingredient('Noodles', 500, 'gm')
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
