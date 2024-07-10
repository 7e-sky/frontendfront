import agent from "agent";

export const GET_WIDGET8 = "[DASHBOARD ADMIN] GET WIDGET 8";
export const REQUEST_WIDGET8 = "[DASHBOARD ADMIN] REQUEST WIDGET 8";
export const CLEAN_UP_WIDGET8 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET8";

export function cleanUpWidget8() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET8,
    });
}

export function getWidgetPackAbonnement(currentRange) {
  const request = agent.get(`/api/widget8?year=${currentRange}`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET8,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET8,
        payload: response.data,
      })
    );
  };
}
export function getWidgetPackJeton(currentRange) {
  const request = agent.get(`/api/widget8_1?year=${currentRange}`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET8,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET8,
        payload: response.data,
      })
    );
  };
}
