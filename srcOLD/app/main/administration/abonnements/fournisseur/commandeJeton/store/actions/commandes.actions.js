import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const GET_COMMANDES = '[COMMANDES APP] GET COMMANDES';
export const SET_SEARCH_TEXT = '[COMMANDES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_COMMANDES = '[COMMANDES APP] TOGGLE IN SELECTED COMMANDES';
export const SELECT_ALL_COMMANDES = '[COMMANDES APP] SELECT ALL COMMANDES';
export const DESELECT_ALL_COMMANDES = '[COMMANDES APP] DESELECT ALL COMMANDES';
export const OPEN_NEW_COMMANDES_DIALOG = '[COMMANDES APP] OPEN NEW COMMANDES DIALOG';
export const CLOSE_NEW_COMMANDES_DIALOG = '[COMMANDES APP] CLOSE NEW COMMANDES DIALOG';
export const OPEN_EDIT_COMMANDES_DIALOG = '[COMMANDES APP] OPEN EDIT COMMANDES DIALOG';
export const CLOSE_EDIT_COMMANDES_DIALOG = '[COMMANDES APP] CLOSE EDIT COMMANDES DIALOG';
export const ADD_COMMANDE = '[COMMANDES APP] ADD COMMANDE';
export const SAVE_ERROR = '[COMMANDES APP] SAVE ERROR';
export const UPDATE_COMMANDE = '[COMMANDES APP] UPDATE COMMANDE';
export const REQUEST_COMMANDES = '[COMMANDES APP] REQUEST_COMMANDES';
export const REMOVE_COMMANDE = '[COMMANDES APP] REMOVE COMMANDE';
export const SET_PARAMETRES_DATA = '[COMMANDES APP] SET PARAMETRES DATA';
export const CLEAN_UP = '[COMMANDES APP] CLEAN_UP';
export const GET_PAIEMENT = '[COMMANDES APP] GET_PAIEMENT';

export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}
export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}
export function getCommandes(parametres) {
    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map((item) => (
            item.value && (
                item.id === 'created' ? (search += '&' + item.id + '[after]=' + item.value) : (search += '&' + item.id + '=' + item.value))
        ));
    }
    const request = agent.get(`/api/demande_jetons?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_COMMANDES,
        });
        return request.then((response) => {
            dispatch({
                type: GET_COMMANDES,
                payload: response.data
            })
        });
    }

}

export function getPaiements() {
    const request = agent.get(`/api/paiements`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_PAIEMENT,
                payload: response.data['hydra:member']
            })
        });
    }

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

export function addCommande(newCommande,parametres) {

    let newJetons = {
        'fournisseur': newCommande.fournisseur['@id'],
        'paiement': newCommande.paiement.value,
        'demande': newCommande['@id'],
        'nbrJeton': newCommande.nbrJeton,
        'prix': parseFloat(newCommande.prix),
        'isPayed': newCommande.isPayed
    }

    return (dispatch, getState) => {


        const request = agent.post('/api/jetons', newJetons);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_COMMANDE
                }),
                
                dispatch(showMessage({
                    message: 'Jetons bien effuctué!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                dispatch(Actions.getCountForBadge('commandes-jetons')),
                dispatch(Actions.getCountForBadge('abonnement-fournisseur'))
            ]).then(() => dispatch(getCommandes(parametres)))
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



export function removeCommande(Commande, id) {
    return (dispatch, getState) => {


        const request = agent.delete(Commande['@id']);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_COMMANDE
                }),
                dispatch(showMessage({
                    message: 'Commande bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                dispatch(Actions.getCountForBadge('commandes-jetons')),
                dispatch(Actions.getCountForBadge('abonnement-fournisseur'))
            ]).then(() => dispatch(getCommandes(id)))
        );
    };
}



