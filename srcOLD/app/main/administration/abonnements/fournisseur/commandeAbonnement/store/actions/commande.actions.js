
import agent from 'agent';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_COMMANDE = '[COMMANDE APP] REQUEST COMMANDE';
export const GET_COMMANDE = '[COMMANDE APP] GET COMMANDE';

export const REQUEST_SOUS_SECTEURS = '[COMMANDE APP] REQUEST_SOUS_SECTEURS';
export const GET_SOUS_SECTEURS = '[COMMANDE APP] GET SOUS_SECTEURS';
export const REQUEST_SECTEURS = '[COMMANDE APP] REQUEST SECTEURS';
export const GET_SECTEURS = '[COMMANDE APP] GET SECTEURS';

export const REQUEST_OFFRES = '[COMMANDE APP] REQUEST OFFRES';
export const GET_OFFRES = '[COMMANDE APP] GET OFFRES';

export const REQUEST_SAVE = '[COMMANDE APP] REQUEST SAVE';
export const SAVE_COMMANDE = '[COMMANDE APP] SAVE COMMANDE';
export const SAVE_ERROR = '[COMMANDE APP] SAVE ERROR';
export const GET_PAIEMENT = '[COMMANDE APP] GET_PAIEMENT';
export const CLEAN_UP = '[COMMANDE APP] CLEAN_UP';
export const GET_DUREE = '[COMMANDE APP] GET_DUREE';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getDurees() {
    const request = agent.get(`/api/durees`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_DUREE,
                payload: response.data['hydra:member']
            })
        });
    }

}

export function updateCommande(data,sousSecteurs,offre,mode,duree, remise,paiement) {
    
    data.offre =offre['@id'];
    data.sousSecteurs = _.map(sousSecteurs, function (value, key) {
        return value.value;
    });
    data.mode=mode;
    data.duree=duree['@id'];
    data.paiement=paiement;
    data.remise=remise;

    const request = agent.put(data['@id'], data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Commande modifiée avec succès' }));
            dispatch(Actions.getCountForBadge('commandes-abonnements'));
            dispatch(Actions.getCountForBadge('abonnement-fournisseur'));
            return dispatch({
                type: SAVE_COMMANDE,
                payload: response.data
            })
        }
        );
    }

}


export function getSousSecteurs(uri) {
    const request = agent.get(`${uri}/sous_secteurs?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEURS,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEURS,
                payload: response.data['hydra:member']
            })
        });

    }

}

export function getSecteurs() {
    const request = agent.get('/api/secteurs?pagination=false&props[]=id&props[]=name&order[name]=asc');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SECTEURS,
                payload: response.data['hydra:member']
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

export function getOffres() {
    const request = agent.get(`/api/offres`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_OFFRES,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_OFFRES,
                payload: response.data['hydra:member']
            })
        }

        );
    }

}

export function getCommande(params) {
    const request = agent.get(`/api/demande_abonnements/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_COMMANDE,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_COMMANDE,
                payload: response.data
            })
        }

        );
    }

}




