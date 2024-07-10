import agent from "agent";

export const GET_WIDGET10 = "[DASHBOARD ADMIN] GET WIDGET 10";
export const REQUEST_WIDGET10 = "[DASHBOARD ADMIN] REQUEST WIDGET 10";
export const CLEAN_UP_WIDGET10 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET10";

export function cleanUpWidget10() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET10,
    });
}

export function getWidget10() {
  const request = agent.get(
    `/api/fournisseurs?itemsPerPage=10&order[created]=desc&props[]=id&props[]=societe&props[]=step&props[]=created`
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET10,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET10,
        payload: response.data,
      })
    );
  };
}
