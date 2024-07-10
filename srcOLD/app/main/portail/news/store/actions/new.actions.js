import agent from "agent";

export const CLEAN_UP = '[NEW ACHAT PORTAIL APP] CLEAN_UP';
export const REQUEST_NEW = '[NEW ACHAT PORTAIL APP] REQUEST_NEW';
export const GET_NEW = '[NEW ACHAT PORTAIL APP] GET_NEW';
export const CLEAN_ERROR = '[NEW ACHAT PORTAIL APP] CLEAN_ERROR';
export const GET_ATTACHEMENT = '[NEW ACHAT PORTAIL APP] GET_ATTACHEMENT';
export const REQUEST_ATTACHEMENT = '[NEW ACHAT PORTAIL APP] REQUEST_ATTACHEMENT';

export function cleanUpNew() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}


export function getNew(id) {
    const request = agent.get(`/api/actualites/${id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_NEW,
        });
        return request.then((response) => {
            dispatch({
                type: GET_NEW,
                payload: response.data
            })
        }
        );
    }

}

