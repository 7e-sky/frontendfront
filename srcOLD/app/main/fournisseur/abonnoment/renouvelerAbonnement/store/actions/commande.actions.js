
import agent from 'agent';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';


export const REQUEST_COMMANDE = '[RENOUVELER AB FRS APP] REQUEST RENOUVELER';
export const GET_COMMANDE = '[RENOUVELER AB FRS APP] GET RENOUVELER';

export const REQUEST_SUGGESTION = '[RENOUVELER AB FRS APP] REQUEST_SUGGESTION';
export const REQUEST_SOUS_SECTEURS = '[RENOUVELER AB FRS APP] REQUEST_SOUS_SECTEURS';
export const GET_SOUS_SECTEURS = '[RENOUVELER AB FRS APP] GET SOUS_SECTEURS';

export const REQUEST_SECTEURS = '[RENOUVELER AB FRS APP] REQUEST SECTEURS';
export const GET_SECTEURS = '[RENOUVELER AB FRS APP] GET SECTEURS';

export const REQUEST_FOURNISSEUR = '[RENOUVELER AB FRS APP] REQUEST FOURNISSEUR';
export const GET_FOURNISSEUR = '[RENOUVELER AB FRS APP] GET FOURNISSEUR';

export const REQUEST_OFFRES = '[RENOUVELER AB FRS APP] REQUEST OFFRES';
export const GET_OFFRES = '[RENOUVELER AB FRS APP] GET OFFRES';

export const REQUEST_SAVE = '[RENOUVELER AB FRS APP] REQUEST SAVE';
export const SAVE_COMMANDE = '[RENOUVELER AB FRS APP] SAVE RENOUVELER';
export const SAVE_SUGGESTION = '[RENOUVELER AB FRS APP] SAVE_SUGGESTION';
export const SAVE_ERROR = '[RENOUVELER AB FRS APP] SAVE ERROR';
export const GET_PAIEMENT = '[RENOUVELER AB FRS APP] GET_PAIEMENT';
export const GET_DUREE = '[RENOUVELER AB FRS APP] GET_DUREE';
export const CLEAN_UP = '[RENOUVELER AB FRS APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function saveRenouvelement(sousSecteurs, offre, mode, duree,history) {

    var postRenovelement = {
        offre: offre['@id'],
        sousSecteurs: _.map(sousSecteurs, function (value, key) {
            return value.value;
        }),
        mode: mode,
        duree: duree['@id'],
        type: true
    }
   
    const request = agent.post('/api/demande_abonnements', postRenovelement);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Votre commande a bien été enregistré, un mail vous sera envoyé dès la validation de votre commande, nous vous remercions pour votre confiance!' }));
            history.push('/abonnement')
            return dispatch({
                type: SAVE_COMMANDE,
                payload: response.data
            })

        }
        );
    }

}


export function AddSuggestionSecteur(secteur, sousSecteur, id_user) {
    let data = {};
    if (sousSecteur && secteur) {
        data.sousSecteur = sousSecteur;
        data.secteur = secteur;
        data.pageSuggestion = "Demande Offre d'abonnement fournisseur";
        data.user = `/api/fournisseurs/${id_user}`
    }

    else {
        return;
    }
    return (dispatch, getState) => {

        const request = agent.post(`/api/suggestion_secteurs`, data);
        dispatch({
            type: REQUEST_SUGGESTION,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: SAVE_SUGGESTION
                }),
                dispatch(showMessage({
                    message: 'Votre suggestion a bien été enregistrée, un mail vous sera envoyé dès la validation de votre suggestion, nous vous remercions pour votre confiance!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        );
    };

}

export function getFournisseurSousSecteurs(params) {
    const request = agent.get(`/api/fournisseurs/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_FOURNISSEUR,
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
    const request = agent.get(`/api/abonnements/${params}`);

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



