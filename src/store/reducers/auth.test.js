import reducer from './auth';
import * as actioTypes from '../actions/actionTypes';

describe('auth reducer', () => {
   it('should return the initial state', () => {
       expect(reducer(undefined, {})).toEqual({
           token: null,
           userId: null,
           error: null,
           loading: false,
           authRedirectPath: '/',
       })
   });

   it('should store the token upon login', () => {
      expect(reducer({
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
      }, {type: actioTypes.AUTH_SUCCESS,
          userId: 1,
          idToken: 100,
      })).toEqual({
          token: 100,
          userId: 1,
          error: null,
          loading: false,
          authRedirectPath: '/',
      })
   });
});
