import agent from "agent";

export const REQUEST_PRODUITS = '[PRODUITS SELECTED APP] REQUEST PRODUITS';
export const CLEAN_UP = '[PRODUITS SELECTED APP] CLEAN_UP';
export const GET_PRODUITS = '[PRODUITS SELECTED APP] GET PRODUITS';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}


export function getProduits()
{
    const request = agent.get(`/api/select_produits`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_PRODUITS,
        });
       return request.then((response) =>
            dispatch({
                type   : GET_PRODUITS,
                payload: response.data['hydra:member']
            })
        );
    }
       
}



