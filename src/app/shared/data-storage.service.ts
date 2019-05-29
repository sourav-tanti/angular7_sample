import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Http, Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer DfklsjfEflsf').append('x-access-token', 'lksajffdslasf');
    return this.httpClient.put(
      'https://ng-recipe-book-c522f.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
      // , { headers: headers }
      , {
        observe: 'response'
      }
      );
  }

  // httpclient request events
  // storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put(
    //   'https://ng-recipe-book-c522f.firebaseio.com/recipes.json?auth=' + token,
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'events'
    //   }
    // );


    // const req = new HttpRequest(
    //   'PUT',
    //   'https://ng-recipe-book-c522f.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     reportProgress: true,
    //     observe: 'response',
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
    //
    // return this.httpClient.request(req);
  // }

  getStoredRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-c522f.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-c522f.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          // const recipes: Recipe[] = response.json();
          recipes.forEach(recipe => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          });
          return recipes;
        }
      )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
