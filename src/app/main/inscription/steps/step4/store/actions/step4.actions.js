import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import jwtService from 'app/services/jwtService';
import { setUserData } from "app/auth/store/actions";


export const GET_PAYS = '[STEP APP] GET PAYS';
export const GET_SECTEURS = '[STEP APP] GET SECTEURS';
export const GET_VILLES = '[STEP APP] GET VILLES';
export const REQUEST_PAYS = '[STEP APP] REQUEST PAYS';
export const REQUEST_VILLES = '[STEP APP] REQUEST VILLES';
export const REQUEST_UPDATE_ACHETEUR = '[STEP APP] REQUEST UPDATE ACHETEUR';
export const UPDATE_ACHETEUR = '[STEP APP] UPDATE ACHETEUR';
export const SAVE_ERROR = '[STEP APP] SAVE ERROR';
export const GET_CURRENCY = '[STEP APP]GET_CURRENCY';


export function getPays() {
    const request = agent.get('/api/pays?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_PAYS,
        });
        return request.then((response) => {

            dispatch({
                type: GET_PAYS,
                payload: response.data['hydra:member']
            })
        });

    }


}

export function getSecteurs() {
    const request = agent.get('/api/secteurs?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {

        return request.then((response) => {

            dispatch({
                type: GET_SECTEURS,
                payload: response.data['hydra:member']
            })
        });

    }

}

export function getCurrency() {
    const request = agent.get('/api/currencies');

    return (dispatch) => {

        return request.then((response) => {

            dispatch({
                type: GET_CURRENCY,
                payload: response.data['hydra:member']
            })
        });

    }

}
export function getVilles(pays_id) {
    const request = agent.get(`${pays_id}/villes?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VILLES,
        });
        return request.then((response) => {

            dispatch({
                type: GET_VILLES,
                payload: response.data['hydra:member']
            })
        });

    }

}


export function setStep4(data, acheteur_id, history) {

    let postData = {
        ...data,
        pays: data.pays && data.pays.value,
        ville: data.ville && data.ville.value,
        secteur: data.secteur && data.secteur.value,
        currency: data.currency && data.currency.value,
        redirect: '/dashboard_ac',
        roles: ['ROLE_ACHETEUR'],
        step: 2
    }
    return (dispatch) => {

        const request = agent.put(`/api/acheteurs/${acheteur_id}`, postData);
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) => {
            jwtService.signInWithToken()
                .then(user => {
                    dispatch({
                        type: UPDATE_ACHETEUR,
                    });
                    dispatch(setUserData(user));
                    return history.push(user.redirect ? user.redirect : '/login')
                })
        }
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}

