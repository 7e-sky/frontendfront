import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const CLEAN_UP_ERRORS = '[REGISTER APP] CLEAN_UP_ERRORS';

export function cleanUpErrors() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_ERRORS,
    });
}

export function submitRegisterFournisseur(newFournisseur, history) {
    return (dispatch, getState) => {

        const request = agent.post('/api/fournisseurs', newFournisseur);

        dispatch({
            type: REQUEST_REGISTER,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REGISTER_SUCCESS
                }),
                console.log(response),
                history.push('/mail-confirm')
            ])
        ).catch((error) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: FuseUtils.parseApiErrors(error)

            });
        });
    };

}

export function submitRegisterAcheteur(newAcheteur, history) {

    return (dispatch, getState) => {

        const request = agent.post('/api/acheteurs', newAcheteur);

        dispatch({
            type: REQUEST_REGISTER,
        });
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REGISTER_SUCCESS
                }),
                history.push('/mail-confirm')
            ])
        ).catch((error) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: FuseUtils.parseApiErrors(error)

            });
        });
    };

}

