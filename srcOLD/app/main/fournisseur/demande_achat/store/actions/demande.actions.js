
import agent from 'agent';
import { showMessage } from 'app/store/actions/fuse';
import { getTokenFournisseur } from 'app/auth/store/actions/user.actions';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';
import _ from '@lodash';

export const REQUEST_VISITE_DEMANDE = '[DEMANDE FOURNISSEUR APP] REQUEST_VISITE_DEMANDE';
export const REQUEST_ADD_PRODUIT = '[DEMANDE FOURNISSEUR APP] REQUEST_ADD_PRODUIT';
export const PRODUITS_ADDED = '[DEMANDE FOURNISSEUR APP] PRODUITS_ADDED';
export const GET_VISITE_DEMANDE = '[DEMANDE FOURNISSEUR APP] GET_VISITE_DEMANDE';

export const REQUEST_DEMANDE = '[DEMANDE FOURNISSEUR APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE FOURNISSEUR APP] GET DEMANDE';
export const GET_PRODUITS_FRS = '[DEMANDE FOURNISSEUR APP] GET PRODUITS FRS';

export const SAVE_ERROR = '[DEMANDE FOURNISSEUR APP] SAVE ERROR';

export const CLEAN_UP = '[DEMANDE FOURNISSEUR APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getDemande(params) {
    const request = agent.get(`/api/demande_achats/${params}/fournisseur`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch(Actions.getCountForBadge('demandes_prix'));
            return dispatch({
                type: GET_DEMANDE,
                payload: response.data
            })
        }

        );
    }

}

export function addProduit(id_produit, produits, id) {
    let nvproduits = _.map(produits, function (value, key) {
        return value['@id'];
    })
    let putData = {
        categories: [...nvproduits, id_produit]
    }

    const request = agent.put(`/api/fournisseurs/${id}`, putData);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_PRODUIT,
        });
        return request.then((response) => {
            dispatch(getProduitsFrs(id));
            return dispatch(showMessage({
                message: 'Bien ajouté!', anchorOrigin: {
                    vertical: 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'
            }))
            dispatch({
                type: PRODUITS_ADDED,
            });
        }

        );
    }

}

export function getProduitsFrs(fournisseur_id) {
    const request = agent.get(`/api/fournisseurs/${fournisseur_id}/categories`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: GET_PRODUITS_FRS,
                payload: response.data['hydra:member']
            })
        }

        );
    }

}


export function getVisiteDemande(fournisseur_id, demande_id) {
    const request = agent.get(`/api/detail_visites?fournisseur=${fournisseur_id}&demande=${demande_id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VISITE_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_VISITE_DEMANDE,
                payload: response.data['hydra:member'][0]
            })
        }

        );
    }

}

export function addVisiteDemande(fournisseur_id, demande) {

    let newVisit = {
        budget: parseFloat(0),
        demande: '/api/demande_achats/' + demande.id,
    }
    const request = agent.post(`/api/detail_visites`, newVisit);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VISITE_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_VISITE_DEMANDE,
                payload: response.data
            })
            dispatch(getTokenFournisseur())
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message: 'Cette société vous a blacklisté, merci de nous contacter sur cette adresse mediateur@lesachatsindustriels.com pour plus de détails',//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    }

}






