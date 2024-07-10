import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_COMMANDES = '[COMMANDES FOURNISSEUR APP] GET COMMANDES';
export const SET_SEARCH_TEXT = '[COMMANDES FOURNISSEUR APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_COMMANDES = '[COMMANDES FOURNISSEUR APP] TOGGLE IN SELECTED COMMANDES';
export const SELECT_ALL_COMMANDES = '[COMMANDES FOURNISSEUR APP] SELECT ALL COMMANDES';
export const DESELECT_ALL_COMMANDES = '[COMMANDES FOURNISSEUR APP] DESELECT ALL COMMANDES';
export const OPEN_NEW_COMMANDES_DIALOG = '[COMMANDES FOURNISSEUR APP] OPEN NEW COMMANDES DIALOG';
export const CLOSE_NEW_COMMANDES_DIALOG = '[COMMANDES FOURNISSEUR APP] CLOSE NEW COMMANDES DIALOG';
export const OPEN_EDIT_COMMANDES_DIALOG = '[COMMANDES FOURNISSEUR APP] OPEN EDIT COMMANDES DIALOG';
export const CLOSE_EDIT_COMMANDES_DIALOG = '[COMMANDES FOURNISSEUR APP] CLOSE EDIT COMMANDES DIALOG';
export const ADD_COMMANDE = '[COMMANDES FOURNISSEUR APP] ADD COMMANDE';
export const SAVE_ERROR = '[COMMANDES FOURNISSEUR APP] SAVE ERROR';
export const UPDATE_COMMANDE = '[COMMANDES FOURNISSEUR APP] UPDATE COMMANDE';
export const REMOVE_COMMANDE = '[COMMANDES FOURNISSEUR APP] REMOVE COMMANDE';
export const CLEAN_UP = '[COMMANDES FOURNISSEUR APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}
export function getCommandes(id) {
    const request = agent.get(`/api/fournisseurs/${id}/commandes?pagination=false&order[created]=desc`);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_COMMANDES,
                payload: response.data['hydra:member']
            })
        });
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openNewCommandesDialog() {
    return {
        type: OPEN_NEW_COMMANDES_DIALOG
    }
}

export function closeNewCommandesDialog() {
    return {
        type: CLOSE_NEW_COMMANDES_DIALOG
    }
}

export function openEditCommandesDialog(data) {
    return {
        type: OPEN_EDIT_COMMANDES_DIALOG,
        data
    }
}

export function closeEditCommandesDialog() {
    return {
        type: CLOSE_EDIT_COMMANDES_DIALOG
    }
}

export function addCommande(newCommande, id) {

    return (dispatch, getState) => {


        const request = agent.post('/api/demande_jetons', newCommande);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_COMMANDE
                }),
                dispatch(showMessage({
                    message: 'Commande bien ajoutée!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getCommandes(id)))
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return key + ': ' + value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}

export function updateCommande(Commande, id) {
    return (dispatch, getState) => {


        const request = agent.put(Commande['@id'], Commande);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_COMMANDE
                }),
                dispatch(showMessage({
                    message: 'Commande bien modifiée!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getCommandes(id)))
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,

                });
                dispatch(
                    showMessage({
                        message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                            return key + ': ' + value;
                        }),//text or html
                        autoHideDuration: 6000,//ms
                        anchorOrigin: {
                            vertical: 'top',//top bottom
                            horizontal: 'right'//left center right
                        },
                        variant: 'error'//success error info warning null
                    }))
            });
    };
}

export function removeCommande(Commande, id) {
    return (dispatch, getState) => {


        const request = agent.delete(Commande['@id']);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_COMMANDE
                }),
                dispatch(showMessage({
                    message: 'Commande bien supprimée!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getCommandes(id)))
        );
    };
}



