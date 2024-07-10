
import agent from 'agent';
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';

export const REQUEST_CONSULTATION = '[CONSULTATION FOURNISSEUR APP] REQUEST CONSULTATION';
export const GET_CONSULTATION = '[CONSULTATION FOURNISSEUR APP] GET CONSULTATION';
export const GET_PERSONNELS = '[CONSULTATION FOURNISSEUR APP] GET_PERSONNELS';

export const REQUEST_SAVE = '[CONSULTATION FOURNISSEUR APP] REQUEST SAVE';
export const SAVE_CONSULTANTION = '[CONSULTATION FOURNISSEUR APP] SAVE CONSULTANTION';
export const SAVE_ERROR = '[CONSULTATION FOURNISSEUR APP] SAVE ERROR';

export const CLEAN_UP = '[CONSULTATION FOURNISSEUR APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getConsultation(params) {
    const request = agent.get(`/api/detail_visites/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONSULTATION,
        });
        return request.then((response) => {
            dispatch({
                type: GET_CONSULTATION,
                payload: response.data
            })
        }

        );
    }

}

export function getPersonnels(params) {
    const request = agent.get(`/api/fournisseurs/${params}/personnels`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_PERSONNELS,
                payload: response.data['hydra:member']
            })
        }

        );
    }

}

export function putConsultation(data) {


    let UpdatedData = {
        budget: parseFloat(data.budget),
        personnel: data.personnel ? data.personnel.value : null,
        sendEmail: data.sendEmail ? data.sendEmail : false,
    }

    const request = agent.put(data['@id'], UpdatedData);

    return (dispatch) => {

        dispatch({
            type: REQUEST_SAVE
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Consultation Modifiée' }));
            return dispatch({
                type: SAVE_CONSULTANTION,
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





