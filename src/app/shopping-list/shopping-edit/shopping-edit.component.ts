import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';

import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as slActions from '../store/shopping-list.actions';
import * as appReducers from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<appReducers.AppState>
  ) { }

  ngOnInit() {
    
    this.editSubscription = this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientIndex > -1) {
          this.editItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            'name': this.editItem.name,
            'amount': this.editItem.amount,
            'unit': this.editItem.unit
          });
        } else {
          this.editMode = false;
        }
      }
    );
    
    
    // this.editSubscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editItemIndex = index;
    //     this.editMode = true;
    //     this.editItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       'name': this.editItem.name,
    //       'amount': this.editItem.amount,
    //       'unit': this.editItem.unit
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newIngredient = new Ingredient(values.name, values.amount, values.unit);
    if (this.editMode) {
      this.store.dispatch(new slActions.UpdateIngredient({
        ingredient: newIngredient
      }));
    } else {
      this.store.dispatch(new slActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new slActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new slActions.EditStop());
    this.editSubscription.unsubscribe();
  }

}
