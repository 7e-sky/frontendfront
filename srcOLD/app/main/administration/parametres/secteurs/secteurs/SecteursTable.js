import React, { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  Tooltip,
  Avatar,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { FuseUtils, FuseAnimate, URL_SITE } from "@fuse";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "../store/actions";

function SecteursTable(props) {
  const secteurs = useSelector(
    ({ secteursApp }) => secteursApp.secteurs.entities
  );
  const loading = useSelector(
    ({ secteursApp }) => secteursApp.secteurs.loading
  );
  const searchText = useSelector(
    ({ secteursApp }) => secteursApp.secteurs.searchText
  );
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (secteurs) {
      setFilteredData(getFilteredArray(secteurs, searchText));
    }
  }, [secteurs, searchText]);

  if (!filteredData) {
    return null;
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo, column) => {
          return {
            className: "h-64 cursor-pointer",
            onClick: (e, handleOriginal) => {
              if (rowInfo) {
                props.history.push(
                  "/parametres/secteurs/" + rowInfo.original.id
                );
              }
            },
          };
        }}
        getTheadProps={(state, rowInfo, column) => {
          return {
            className: "h-64 font-bold",
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: "",
            Cell: (row) =>
              row.original.image ? (
                <Avatar
                  className="mr-8"
                  alt={row.original.firstName}
                  src={URL_SITE + row.original.image.url}
                />
              ) : (
                <Avatar
                  className="mr-8"
                  alt={row.original.firstName}
                  src="assets/images/avatars/images.png"
                />
              ),

            className: "justify-center",
            width: 64,
            sortable: false,
          },

          {
            Header: "Secteur",
            filterable: true,
            accessor: "name",
          },

          {
            Header: "",
            Cell: (row) => (
              <div className="flex items-center">
                <Tooltip title="Editer">
                  <IconButton className="text-teal text-20">
                    <Icon>edit</Icon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer">
                  <IconButton
                    className="text-red text-20"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      dispatch(
                        Actions.openDialog({
                          children: (
                            <React.Fragment>
                              <DialogTitle id="alert-dialog-title">
                                Suppression
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Voulez vous vraiment supprimer cet
                                  enregistrement ?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() =>
                                    dispatch(Actions.closeDialog())
                                  }
                                  color="primary"
                                >
                                  Non
                                </Button>
                                <Button
                                  onClick={(ev) => {
                                    dispatch(
                                      Actions.removeSecteur(row.original)
                                    );
                                    dispatch(Actions.closeDialog());
                                  }}
                                  color="primary"
                                  autoFocus
                                >
                                  Oui
                                </Button>
                              </DialogActions>
                            </React.Fragment>
                          ),
                        })
                      );
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        loading={loading}
        noDataText="Aucun secteur trouvé"
        loadingText="Chargement..."
        ofText="sur"
      />
    </FuseAnimate>
  );
}

export default withRouter(SecteursTable);
