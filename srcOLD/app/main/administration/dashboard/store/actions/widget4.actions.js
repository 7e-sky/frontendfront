import agent from 'agent';

export const GET_WIDGET4 = '[DASHBOARD ADMIN] GET WIDGET 4';
export const REQUEST_WIDGET4 = '[DASHBOARD ADMIN] REQUEST WIDGET 4';
export const CLEAN_UP_WIDGET4 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET4';

export function cleanUpWidget4() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET4,
    });
}

export function getWidget4() {
    const request = agent.get(`/api/widget4`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET4,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET4,
                payload: response.data
            })
        );
    }
}
