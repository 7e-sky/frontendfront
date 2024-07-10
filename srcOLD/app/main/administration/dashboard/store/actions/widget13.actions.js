import agent from "agent";
import moment from "moment";

export const GET_WIDGET13 = "[DASHBOARD ADMIN] GET WIDGET 13";
export const REQUEST_WIDGET13 = "[DASHBOARD ADMIN] REQUEST WIDGET 13";
export const CLEAN_UP_WIDGET13 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET13";

export function cleanUpWidget13() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET13,
    });
}

export function getWidget13() {
  const request = agent.get(`/api/widget13?year=${moment().format("Y")}`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET13,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET13,
        payload: response.data,
      })
    );
  };
}
