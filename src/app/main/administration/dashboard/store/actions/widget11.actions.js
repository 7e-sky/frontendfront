import agent from "agent";

export const GET_WIDGET11 = "[DASHBOARD ADMIN] GET WIDGET 11";
export const REQUEST_WIDGET11 = "[DASHBOARD ADMIN] REQUEST WIDGET 11";
export const CLEAN_UP_WIDGET11 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET11";

export function cleanUpWidget11() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET11,
    });
}

export function getWidget11() {
  const request = agent.get(
    `/api/acheteurs?itemsPerPage=10&order[created]=desc&props[]=id&props[]=societe&props[]=step&props[]=created`
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET11,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET11,
        payload: response.data,
      })
    );
  };
}
