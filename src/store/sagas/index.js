import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from './../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export function* watchOrders() {
    yield all([actionTypes.FETCH_ORDERS, fetchOrdersSaga]);
}