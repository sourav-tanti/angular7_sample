import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as appReducers from '../store/app.reducers';
import * as slActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private slService: ShoppingListService,
    private store: Store<appReducers.AppState>
  ) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new slActions.EditStart(index));
  }
}
