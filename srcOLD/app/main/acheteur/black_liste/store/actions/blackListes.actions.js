import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_BLACK_LISTES = '[BLACK_LISTES APP] GET BLACK_LISTES';
export const SET_SEARCH_TEXT = '[BLACK_LISTES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BLACK_LISTES = '[BLACK_LISTES APP] TOGGLE IN SELECTED BLACK_LISTES';
export const SELECT_ALL_BLACK_LISTES = '[BLACK_LISTES APP] SELECT ALL BLACK_LISTES';
export const DESELECT_ALL_BLACK_LISTES = '[BLACK_LISTES APP] DESELECT ALL BLACK_LISTES';
export const OPEN_NEW_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] OPEN NEW BLACK_LISTES DIALOG';
export const CLOSE_NEW_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] CLOSE NEW BLACK_LISTES DIALOG';
export const OPEN_EDIT_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] OPEN EDIT BLACK_LISTES DIALOG';
export const CLOSE_EDIT_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] CLOSE EDIT BLACK_LISTES DIALOG';
export const SAVE_ERROR = '[BLACK_LISTES APP] SAVE ERROR';
export const SAVE_DATA = '[BLACK_LISTES APP]  SAVE_DATA';
export const REMOVE_BLACK_LISTE = '[BLACK_LISTES APP] REMOVE BLACK_LISTE';
export const REQUEST_SAVE = '[BLACK_LISTES APP] REQUEST_SAVE';

/*export const GET_FOURNISSEURS = '[BLACK_LISTES APP] GET FOURNISSEURS';


export function getFournisseurs(societe)
{
    const request = agent.get(`/api/fournisseurs?societe${societe}=&props[]=id&props[]=societe`);

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_FOURNISSEURS,
                payload: response.data['hydra:member']
            })
        });
}
*/
export function getBlackListes(id_acheteur) {
    const request = agent.get(`/api/acheteurs/${id_acheteur}/blacklistes`);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_BLACK_LISTES,
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


export function openNewBlackListesDialog() {
    return {
        type: OPEN_NEW_BLACK_LISTES_DIALOG
    }
}

export function closeNewBlackListesDialog() {
    return {
        type: CLOSE_NEW_BLACK_LISTES_DIALOG
    }
}

export function openEditBlackListesDialog(data) {
    return {
        type: OPEN_EDIT_BLACK_LISTES_DIALOG,
        data
    }
}

export function closeEditBlackListesDialog() {
    return {
        type: CLOSE_EDIT_BLACK_LISTES_DIALOG
    }
}

export function addBlackListe(newBlackListe, id_acheteur) {

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE
        });
        const request = agent.post('/api/black_listes', newBlackListe);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SAVE_DATA
                }),
                dispatch(showMessage({
                    message: 'Blacklisté avec succès!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
                ,
                dispatch(closeNewBlackListesDialog())
            ]).then(() => dispatch(getBlackListes(id_acheteur)))
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
                }));
            dispatch(closeNewBlackListesDialog());

        });
    };
}

export function updateBlackListe(BlackListe, id_acheteur) {
    return (dispatch) => {

        dispatch({
            type: REQUEST_SAVE
        });
        const request = agent.put(BlackListe['@id'], BlackListe);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SAVE_DATA
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                dispatch(closeEditBlackListesDialog())

            ]).then(() => dispatch(getBlackListes(id_acheteur)))
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
                    }));
                dispatch(closeEditBlackListesDialog())
            });
    };
}

export function removeBlackListe(BlackListe, state, id_acheteur) {
    let Update = { etat: state }
    return (dispatch) => {


        const request = agent.put(BlackListe['@id'], Update);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_BLACK_LISTE
                }),
                dispatch(showMessage({
                    message: state ? 'Bien blacklisté' : 'Bien déblacklisté', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getBlackListes(id_acheteur)))
        );
    };
}



