import agent from "agent";

export const REQUEST_SECTEURS = '[CATEGORIES NAVIGATION APP] REQUEST_SECTEURS';
export const REQUEST_SOUS_SECTEURS = '[CATEGORIES NAVIGATION APP] REQUEST_SOUS_SECTEURS';
export const GET_SECTEURS = '[CATEGORIES NAVIGATION APP] GET_SECTEURS';
export const GET_SOUS_SECTEURS = '[CATEGORIES NAVIGATION APP] GET_SOUS_SECTEURS';
export const CLEAN_UP = '[CATEGORIES NAVIGATION APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getSecteurs() {
    const request = agent.get('/api/categories_navigations');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS,
        });
        return request.then((response) => {
            dispatch({
                        type: GET_SECTEURS,
                        payload: response.data
                    })
            }
        );
    }
}


export function getSousSecteurs(iri) {
    const request = agent.get(`${iri}/sous_secteurs?itemsPerPage=4`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEURS,
        });
        return request.then((response) => {
            dispatch({
                        type: GET_SOUS_SECTEURS,
                        payload: response.data['hydra:member']
                    })
            }
        );
    }
}


