
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import agent from 'agent';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';


export const REQUEST_CONTACT = '[CONTACT FOURNISSEUR APP] REQUEST CONTACT';
export const GET_CONTACT = '[CONTACT FOURNISSEUR APP] GET CONTACT';
export const REQUEST_SAVE = '[CONTACT FOURNISSEUR APP] REQUEST SAVE';
export const REDIRECT_SUCCESS = '[CONTACT FOURNISSEUR APP] REDIRECT SUCCESS';

export const SAVE_CONTACT = '[CONTACT FOURNISSEUR APP] SAVE CONTACT';
export const SAVE_ERROR = '[CONTACT FOURNISSEUR APP] SAVE ERROR';
export const CLEAN_ERROR = '[CONTACT FOURNISSEUR APP] CLEAN_ERROR';
export const CLEAN_UP = '[CONTACT FOURNISSEUR APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}
export function cleanError() {

    return (dispatch) => dispatch({
        type: CLEAN_ERROR,
    });
}

export function getMessage(params) {
    const request = agent.get(`/api/contact_fournisseurs/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONTACT,
        });
        return request.then((response) => {
            dispatch({
                type: GET_CONTACT,
                payload: response.data
            })
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    }

}

export function putMessage(data, id,history) {

    const request = agent.put(`/api/contact_fournisseurs/${id}`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {
            dispatch(Actions.getCountForBadge('message-fournisseur'));
            dispatch(showMessage({ message: 'Message Modifié' }));
            history.push('/contact_fournisseur');
            
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}

