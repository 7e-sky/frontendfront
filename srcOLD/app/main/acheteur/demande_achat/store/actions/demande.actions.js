import { FuseUtils } from "@fuse";
import { showMessage } from "app/store/actions/fuse";
import agent from "agent";
import _ from "@lodash";

export const REQUEST_DEMANDE = "[ DEMANDE ACHETEUR APP] REQUEST DEMANDE";
export const GET_DEMANDE = "[ DEMANDE ACHETEUR APP] GET DEMANDE";
export const REQUEST_DEMANDE_FOURNISSEURS =
  "[ DEMANDE ACHETEUR APP] REQUEST DEMANDE FOURNISSEURS";
export const GET_DEMANDE_FOURNISSEURS =
  "[ DEMANDE ACHETEUR APP] GET DEMANDEFOURNISSEURS";

export const REQUEST_SAVE = "[ DEMANDE ACHETEUR APP] REQUEST SAVE";
export const REDIRECT_SUCCESS = "[ DEMANDE ACHETEUR APP] REDIRECT SUCCESS";

export const SAVE_DEMANDE = "[ DEMANDE ACHETEUR APP] SAVE DEMANDE";
export const NEW_DEMANDE = "[ DEMANDE ACHETEUR APP] NEW DEMANDE";
export const SAVE_ERROR = "[ DEMANDE ACHETEUR APP] SAVE ERROR";

export const REQUEST_SOUS_SECTEUR =
  "[ DEMANDE ACHETEUR APP] REQUEST SOUS_SECTEUR";
export const GET_SOUS_SECTEUR = "[ DEMANDE ACHETEUR APP] GET SOUS SECTEUR";

export const UPLOAD_ATTACHEMENT = "[ DEMANDE ACHETEUR APP] UPLOAD ATTACHEMENT";
export const UPLOAD_REQUEST = "[ DEMANDE ACHETEUR APP] UPLOAD REQUEST";
export const UPLOAD_ERROR = "[ DEMANDE ACHETEUR APP] UPLOAD ERROR";

export const REQUEST_DELETE = "[ DEMANDE ACHETEUR APP] REQUEST DELETE";
export const DELETE_SUCCESS = "[ DEMANDE ACHETEUR APP] DELETE SUCCESS";
export const ERROR_DELETE = "[ DEMANDE ACHETEUR APP] ERROR DELETE";
export const CLEAN_UP_DEMANDE = "[ DEMANDE ACHETEUR APP] CLEAN_UP";

export const REQUEST_SAVE_FOURNISSEUR =
  "[ DEMANDE ACHETEUR APP] REQUEST_SAVE_FOURNISSEUR";
export const SAVE_FOURNISSEUR = "[ DEMANDE ACHETEUR APP] SAVE_FOURNISSEUR";

export function cleanUpDemande() {
  return (dispatch) =>
    dispatch({
      type: CLEAN_UP_DEMANDE,
    });
}

export function getSousSecteurs() {
  const request = agent.get(
    "/api/sous_secteurs?pagination=false&props[]=id&props[]=name"
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_SOUS_SECTEUR,
    });
    return request.then((response) => {
      dispatch({
        type: GET_SOUS_SECTEUR,
        payload: response.data["hydra:member"],
      });
    });
  };
}

export function getDemande(params) {
  const request = agent.get(`/api/demande_achats/${params}`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_DEMANDE,
    });
    return request
      .then((response) => {
        dispatch({
          type: GET_DEMANDE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SAVE_ERROR,
          payload: FuseUtils.parseApiErrors(error),
        });
      });
  };
}

// Récuperer les fournisseurs qui sont participer a cette demande
export function getFournisseurParticipe(id_demande) {
  const request = agent.get(`/api/demande_achats/${id_demande}/visites`);

  return (dispatch) => {
    dispatch({
      type: REQUEST_DEMANDE_FOURNISSEURS,
    });
    return request.then((response) => {
      dispatch({
        type: GET_DEMANDE_FOURNISSEURS,
        payload: response.data,
      });
    });
  };
}

export function saveFournisseurGange(id_fournisseur, id_demande) {
  var postData = {
    id_fournisseur,
  };

  const request = agent.post(
    `/api/demande_achats/${id_demande}/fournisseur_gagne`,
    postData
  );

  return (dispatch) => {
    dispatch({
      type: REQUEST_SAVE_FOURNISSEUR,
    });
    return request
      .then((response) => {
        dispatch({
          type: SAVE_FOURNISSEUR,
        });
        dispatch(getDemande(response.data.id));
      })
      .catch((error) => {});
  };
}

export function saveDemande(data, history, categories, suggestions, vider) {
  var postData = {
    ...data,
    categories: _.map(categories, function (value, key) {
      return value["@id"];
    }),
    attachements: _.map(data.attachements, function (value, key) {
      return value["@id"];
    }),
    autreCategories:
      suggestions.length > 0 ? _.join(_.map(suggestions), ", ") : null,
    budget: data.budget && parseFloat(data.budget),
  };

  const request = agent.post("/api/demande_achats", postData);

  return (dispatch) => {
    dispatch({
      type: REQUEST_SAVE,
    });
    return request
      .then((response) => {
        dispatch(showMessage({ message: "Demande enregistrée" }));

        if (!vider) {
          history.push("/demandes");
        } else {
          dispatch(newDemande());
          dispatch({
            type: NEW_DEMANDE,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SAVE_ERROR,
          payload: FuseUtils.parseApiErrors(error),
        });
      });
  };
}

export function putDemande(
  data,
  url,
  history,
  categories,
  suggestions,
  updated,
  updateExpiration,
  annulation
) {
  var putData = {
    ...data,
    categories: _.map(categories, function (value, key) {
      return value["@id"];
    }),
    attachements: _.map(data.attachements, function (value, key) {
      return value["@id"];
    }),
    budget: data.budget && parseFloat(data.budget),
    autreCategories:
      suggestions.length > 0 ? _.join(_.map(suggestions), ", ") : null,
    updated,
    updateExpiration,
    annulation,
  };
  delete putData.reference;
  if (putData.motifRejet) delete putData.motifRejet;
  const request = agent.put(`/api/demande_achats/${url}`, putData);

  return (dispatch) => {
    dispatch({
      type: REQUEST_SAVE,
    });
    return request
      .then((response) => {
        dispatch(showMessage({ message: "Demande Modifiée" }));

        /*dispatch({
                type: SAVE_DEMANDE,
                payload: response.data
            })*/
        history.push("/demandes");
      })
      .catch((error) => {
        dispatch({
          type: SAVE_ERROR,
          payload: FuseUtils.parseApiErrors(error),
        });
      });
  };
}

export function deleteMedia(media) {
  const request = agent.delete(media["@id"]);

  return (dispatch) => {
    dispatch({
      type: REQUEST_DELETE,
    });
    return request
      .then((response) => {
        dispatch(showMessage({ message: "Document supprimé" }));

        return dispatch({
          type: DELETE_SUCCESS,
          id: media.id,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_DELETE,
          payload: FuseUtils.parseApiErrors(error),
        });
      });
  };
}

export function uploadAttachement(file) {
  return (dispatch, getState) => {
    const formData = new FormData();
    formData.append("file", file);

    const request = agent.post("/api/attachements", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: UPLOAD_REQUEST,
    });
    return request
      .then((response) =>
        Promise.all([
          response,
          console.log(response.data),
          dispatch({
            type: UPLOAD_ATTACHEMENT,
            payload: response.data,
          }),
          dispatch(
            showMessage({
              message: "Document téléchargé!",
              anchorOrigin: {
                vertical: "top", //top bottom
                horizontal: "right", //left center right
              },
              variant: "success",
            })
          ),
        ])
      )
      .catch((error) => {
        dispatch({
          type: UPLOAD_ERROR,
        });
        dispatch(
          showMessage({
            message: _.map(FuseUtils.parseApiErrors(error), function (
              value,
              key
            ) {
              return key + ": " + value;
            }), //text or html
            autoHideDuration: 6000, //ms
            anchorOrigin: {
              vertical: "top", //top bottom
              horizontal: "right", //left center right
            },
            variant: "error", //success error info warning null
          })
        );
      });
  };
}

export function newDemande() {
  const data = {
    id: null,
    reference: "",
    description: "",
    localisation: 1,
    dateExpiration: null,
    isPublic: false,
    isAnonyme: false,
    categories: null,
    budget: 0,
    motifRejet: "",
    statut: null,
    attachements: [],
    diffusionsdemandes: [],
  };

  return {
    type: GET_DEMANDE,
    payload: data,
  };
}
