
import {Ingredient} from '../../shared/ingredient.model';
import * as slActions from './shopping-list.actions';


export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Chicken', 500, 'gm'),
    new Ingredient('Potato', 2, 'kg')
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: slActions.ShoppingListActions  ) {
  switch (action.type) {
    case slActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case slActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [ ...state.ingredients, ...action.payload ]
      }
    case slActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload['ingredient']
      };
      const ingredients = state.ingredients;
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case slActions.DELETE_INGREDIENT:
      const oldIngredients = state.ingredients;
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case slActions.EDIT_START:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case slActions.EDIT_STOP:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return {...state};
  }
}
