import agent from 'agent';

export const GET_WIDGET6 = '[DASHBOARD ADMIN] GET WIDGET 6';
export const REQUEST_WIDGET6 = '[DASHBOARD ADMIN] REQUEST WIDGET 6';
export const CLEAN_UP_WIDGET6 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET6';

export function cleanUpWidget6() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET6,
    });
}

export function getWidget6() {
    const request = agent.get(`/api/widget6`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET6,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET6,
                payload: response.data
            })
        );
    }
}
