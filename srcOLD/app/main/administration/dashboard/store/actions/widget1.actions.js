import agent from 'agent';

export const GET_WIDGET1 = '[DASHBOARD ADMIN] GET WIDGET 1';
export const REQUEST_WIDGET1 = '[DASHBOARD ADMIN] REQUEST WIDGET 1';
export const CLEAN_UP_WIDGET1 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET1';

export function cleanUpWidget1() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET1,
    });
}

export function getWidget1(currentRange) {
    const request = agent.get(`/api/widget1?year=${currentRange}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET1,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET1,
                payload: response.data
            })
        );
    }
}
