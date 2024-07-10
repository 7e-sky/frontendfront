import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import { getTokenFournisseur } from './user.actions';
import { getAbonnementFournisseur } from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export const REQUEST_RE_LOGIN = 'REQUEST_RE_LOGIN';
export const LOGIN_RE_SUCCESS = 'LOGIN_RE_SUCCESS';
export const LOGIN_RE_ERROR = 'LOGIN_RE_ERROR';

export function requestReLogin() {
    return {
        type: REQUEST_RE_LOGIN,
    }
}
export function successReLogin() {
    return {
        type: LOGIN_RE_SUCCESS,
    }
}

export function errorReLogin() {
    return {
        type: LOGIN_RE_ERROR,
    }
}
export function submitLogin({ email, password }) {
    return (dispatch) => {
        dispatch({
            type: REQUEST_LOGIN
        });
        return jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(setUserData(user));

                /* ============= TOKENS FOURNISSEURS ============*/
                if (user.role === 'ROLE_FOURNISSEUR') {
                    dispatch(getTokenFournisseur());
                    dispatch(getAbonnementFournisseur(user.id));
                }
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            }
            )
            .catch(error => {
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
    }

}

export function submitLoginWithConfirmToken(confirmationToken) {

    return (dispatch) =>

        jwtService.signInWithConfirmToken(confirmationToken)
            .then((user) => {
                dispatch(setUserData(user));

                return dispatch({
                    type: LOGIN_SUCCESS
                });
            }
            )
            .catch(error => {
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
}

