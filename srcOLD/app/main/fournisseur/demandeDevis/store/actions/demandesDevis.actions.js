import { showMessage } from 'app/store/actions/fuse';
import agent from "agent";
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_DEMANDES = '[DEMANDES DEVIS FOURNISSEUR APP] REQUEST DEMANDES';
export const REMOVE_DEMANDE = '[DEMANDES DEVIS FOURNISSEUR APP] REMOVE DEMANDES';
export const STATUT_DEMANDE = '[DEMANDES DEVIS FOURNISSEUR APP] STATUT DEMANDES';
export const SET_PARAMETRES_DATA = '[DEMANDES DEVIS FOURNISSEUR APP] SET PARAMETRES DATA';


export const GET_DEMANDES = '[DEMANDES DEVIS FOURNISSEUR APP] GET DEMANDES';
export const SET_DEMANDES_SEARCH_TEXT = '[DEMANDES DEVIS FOURNISSEUR APP] SET DEMANDES SEARCH TEXT';

export function getDemandes(parametres, id) {
    var message = parametres.message ? `=${parametres.message}` : '';
    const request = agent.get(`/api/fournisseurs/${id}/demandes?page=${parametres.page}&del=false&message${message}&statut=1&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_DEMANDES,
                payload: response.data
            })
        );
    }

}
export function removeDemande(demande, parametres, id) {

    let Updatedemande = { del: true }
    return (dispatch, getState) => {


        const request = agent.put(`/api/demande_devis/${demande.id}`, Updatedemande);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_DEMANDE
                }),
                dispatch(Actions.getCountForBadge('product-devis')),
                dispatch(showMessage({
                    message: 'Demande bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getDemandes(parametres, id)))
        );
    };
}



export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}

export function setDemandesSearchText(event) {
    return {
        type: SET_DEMANDES_SEARCH_TEXT,
        searchText: event.target.value
    }
}



