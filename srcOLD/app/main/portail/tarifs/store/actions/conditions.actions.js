import agent from "agent";

export const CLEAN_UP = '[CONDITIONS PORTAIL APP] CLEAN_UP';
export const REQUEST_CONDITIONS = '[CONDITIONS PORTAIL APP] REQUEST_CONDITIONS';
export const GET_CONDITIONS = '[CONDITIONS PORTAIL APP] GET_CONDITIONS';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getConditions() {
    const request = agent.get(`/api/condition_generales`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONDITIONS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_CONDITIONS,
                payload: response.data
            })

        }

        );
    }

}

