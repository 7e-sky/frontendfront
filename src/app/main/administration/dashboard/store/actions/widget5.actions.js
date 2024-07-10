import agent from 'agent';

export const GET_WIDGET5 = '[DASHBOARD ADMIN] GET WIDGET 5';
export const REQUEST_WIDGET5 = '[DASHBOARD ADMIN] REQUEST WIDGET 5';
export const CLEAN_UP_WIDGET5 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET5';

export function cleanUpWidget5() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET5,
    });
}

export function getWidget5() {
    const request = agent.get(`/api/widget5`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET5,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET5,
                payload: response.data
            })
        );
    }
}
