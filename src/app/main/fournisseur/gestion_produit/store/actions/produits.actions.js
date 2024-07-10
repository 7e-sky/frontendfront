import { showMessage } from 'app/store/actions/fuse';
import agent from "agent";

export const REQUEST_PRODUITS = '[PRODUITS FOURNISSEURS APP] REQUEST PRODUITS';
export const REQUEST_FREE_PRODUITS = '[PRODUITS FOURNISSEURS APP] REQUEST FREE PRODUITS';
export const REMOVE_PRODUIT = '[PRODUITS FOURNISSEURS APP] REMOVE PRODUITS';
export const STATUT_PRODUIT = '[PRODUITS FOURNISSEURS APP] STATUT PRODUITS';
export const SET_PARAMETRES_DATA = '[PRODUITS FOURNISSEURS APP] SET PARAMETRES DATA';
export const CLEAN_UP = '[PRODUITS FOURNISSEURS APP] CLEAN_UP';
export const CLEAN_UP_FREE = '[PRODUITS FOURNISSEURS APP] CLEAN_UP_FREE';


export const GET_PRODUITS = '[PRODUITS FOURNISSEURS APP] GET PRODUITS';
export const GET_FREE_PRODUITS = '[PRODUITS FOURNISSEURS APP] GET FREE PRODUITS';
export const SET_PRODUITS_SEARCH_TEXT = '[PRODUITS FOURNISSEURS APP] SET PRODUITS SEARCH TEXT';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function cleanUpFree() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_FREE,
    });
}


export function getProduits(id_fournisseur, parametres) {
    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map((item) => (
            item.value && (
                item.id === 'created' ? (search += '&' + item.id + '[after]=' + item.value) : (search += '&' + item.id + '=' + item.value))
        ));
    }
    const request = agent.get(`/api/fournisseurs/${id_fournisseur}/produits?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUITS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_PRODUITS,
                payload: response.data
            })
        );
    }

}

export function getFreeProduits(user) {

    const request = agent.get(`/api/free-products`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FREE_PRODUITS
        })
        return request.then((response) =>


            dispatch({
                type: GET_FREE_PRODUITS,
                payload: response.data
            })
        );
    }

}

export function removeProduit(produit, parametres, user) {

    let Updateproduit = { del: true }
    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUITS,
        });
        const request = agent.put(`/api/produits/${produit.id}`, Updateproduit);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PRODUIT
                }),
                dispatch(showMessage({
                    message: 'Produit bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getProduits(user.id, parametres))).then(() => dispatch(getFreeProduits(user)))
        );
    };
}



export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}

export function setProduitsSearchText(event) {
    return {
        type: SET_PRODUITS_SEARCH_TEXT,
        searchText: event.target.value
    }
}



