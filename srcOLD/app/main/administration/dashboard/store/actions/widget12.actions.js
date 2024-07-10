import agent from "agent";

export const GET_WIDGET12 = "[DASHBOARD ADMIN] GET WIDGET 12";
export const REQUEST_WIDGET12 = "[DASHBOARD ADMIN] REQUEST WIDGET 12";
export const CLEAN_UP_WIDGET12 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET12";

export function cleanUpWidget12() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET12,
    });
}

export function getWidget12(currentRange) {
  const request = agent.get(`/api/widget12?year=${currentRange}`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET12,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET12,
        payload: response.data,
      })
    );
  };
}
