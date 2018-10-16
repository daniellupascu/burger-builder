import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 1
};

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    // },
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            };

        default:
            return state;
    }

};

export default reducer;