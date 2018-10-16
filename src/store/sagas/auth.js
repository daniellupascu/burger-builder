import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');

    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000); 
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());

        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true,
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=YOUR_KEY_HERE';

        if (!action.isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=YOUR_KEY_HERE';
        }

        try {
            const response = yield axios.post(url, authData);

            yield localStorage.setItem('token', response.data.idToken);
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('expirationTime', expirationDate);
            yield localStorage.setItem('userId', response.data.localId);

            yield put(actions.authSuccess(response.data));
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
        } catch(err) {
            yield console.log(err);
            yield put(actions.authFail(err.response.data.error));
        }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(actions.logout());
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));

        if(expirationTime <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000 ));
        }
    }
}
