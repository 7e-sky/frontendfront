import agent from 'agent';

export const GET_WIDGET3 = '[DASHBOARD ADMIN] GET WIDGET 3';
export const REQUEST_WIDGET3 = '[DASHBOARD ADMIN] REQUEST WIDGET 3';
export const CLEAN_UP_WIDGET3 = '[DASHBOARD ADMIN] CLEAN_UP_WIDGET3';

export function cleanUpWidget3() {
    return (dispatch) => dispatch({
        type: CLEAN_UP_WIDGET3,
    });
}

export function getWidget3(currentRange) {
    const request = agent.get(`/api/widget3?year=${currentRange}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_WIDGET3,
        });
        return request.then((response) =>
            dispatch({
                type: GET_WIDGET3,
                payload: response.data
            })
        );
    }
}
