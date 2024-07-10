import agent from 'agent';

export const GET_WIDGET2 = '[DASHBOARD ADMIN] GET WIDGET 2';
export const REQUEST_WIDGET2 = '[DASHBOARD ADMIN] REQUEST WIDGET 2';
export const CLEAN_UP_WIDGET2 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET2';

export function cleanUpWidget2() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET2,
    });
}

export function getWidget2(currentRange) {
    const request = agent.get(`/api/widget2?year=${currentRange}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET2,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET2,
                payload: response.data
            })
        );
    }
}
