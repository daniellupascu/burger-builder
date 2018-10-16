import * as actionType from './actionTypes';

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId,
    };
};

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationTime');
    // localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_INITIATE_LOGOUT,
    };
};

export const logoutSucceed = () => {
    return {
        type: actionType.AUTH_LOGOUT,
    }
};

export const checkAuthTimeout = expirationTime => {
    // return dispatch => {
    //     setTimeout( () => {
    //         dispatch(logout());
    //     }, expirationTime * 1000 );
    // };
    return { 
        type: actionType.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime,
         }
};

export const auth = (email, password, isSignup) => {
    return {
        type: actionType.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
    // return dispatch => {
    //     dispatch(authStart());

    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true,
    //     };

    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBFTweW0MlGRX_QT7WT6deLbQUh5xV6xH4';

    //     if (!isSignup) {
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBFTweW0MlGRX_QT7WT6deLbQUh5xV6xH4';
    //     }

    //     axios.post(url, authData)
    //         .then(response => {

    //             localStorage.setItem('token', response.data.idToken);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('expirationTime', expirationDate);
    //             localStorage.setItem('userId', response.data.localId);

    //             dispatch(authSuccess(response.data));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             dispatch(authFail(err.response.data.error));
    //         });
    // };

};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationTime = new Date(localStorage.getItem('expirationTime'));

    //         if(expirationTime <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000 ));
    //         }
    //     }
    // }
    return {
        type: actionType.AUTH_CHECK_STATE
    }
};