
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import agent from 'agent';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';


export const REQUEST_DEMANDE = '[DEMANDE APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE APP] GET DEMANDE';
export const REQUEST_SAVE = '[DEMANDE APP] REQUEST SAVE';
export const REDIRECT_SUCCESS = '[DEMANDE APP] REDIRECT SUCCESS';

export const SAVE_DEMANDE = '[DEMANDE APP] SAVE DEMANDE';
export const SAVE_ERROR = '[DEMANDE APP] SAVE ERROR';



export function getDemande(params) {
    const request = agent.get(`/api/demande_devis/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_DEMANDE,
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

export function putDemande(data, id) {

    const request = agent.put(`/api/demande_devis/${id}`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Demande Modifiée' }));
            dispatch(Actions.getCountForBadge('demandes-devis'));
            return dispatch({
                type: SAVE_DEMANDE,
                payload: response.data
            })
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}

