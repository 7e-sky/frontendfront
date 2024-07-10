import agent from "agent";

export const GET_WIDGET9 = "[DASHBOARD ADMIN] GET WIDGET 9";
export const REQUEST_WIDGET9 = "[DASHBOARD ADMIN] REQUEST WIDGET 9";
export const CLEAN_UP_WIDGET9 = "[DASHBOARD ADMIN] CLEAN_UP_WIDGET9";

export function cleanUpWidget9() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_WIDGET9,
    });
}

export function getWidgetCommandeAbonnement() {
  const request = agent.get(
    `/api/demande_abonnements?itemsPerPage=5&order[created]=desc&props[]=fournisseur&props[]=offre&props[]=created&props[]=statut`
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET9,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET9,
        payload: response.data["hydra:member"],
      })
    );
  };
}
export function getWidgetCommandeJeton(start_date, end_date) {
  const request = agent.get(
    `/api/demande_jetons?itemsPerPage=5&order[created]=desc&props[]=fournisseur&props[]=nbrJeton&props[]=created&props[]=isUse`
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_WIDGET9,
    });
    return request.then((response) =>
      dispatch({
        type: GET_WIDGET9,
        payload: response.data["hydra:member"],
      })
    );
  };
}
