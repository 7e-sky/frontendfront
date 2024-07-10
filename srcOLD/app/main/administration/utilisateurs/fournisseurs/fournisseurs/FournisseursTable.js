import React, { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  Tooltip,
  Avatar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { FuseAnimate, URL_SITE, FuseUtils } from "@fuse";
import { withRouter } from "react-router-dom";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReactTable from "react-table";
import _ from "@lodash";

function FournisseursTable(props) {
  const dispatch = useDispatch();
  const fournisseurs = useSelector(
    ({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.data
  );
  const loading = useSelector(
    ({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.loading
  );
  const pageCount = useSelector(
    ({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.pageCount
  );
  const parametres = useSelector(
    ({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.parametres
  );

  const searchText = useSelector(
    ({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.searchText
  );

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (fournisseurs) {
      setFilteredData(getFilteredArray(fournisseurs, searchText));
    }
  }, [fournisseurs, searchText]);

  if (!filteredData) {
    return null;
  }

  //dispatch from function filter
  const run = (parametres) => dispatch(Actions.setParametresData(parametres));

  //call run function
  const fn = _.debounce(run, 1000);

  return (
    <div className="w-full flex flex-col">
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
          className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
          getTheadProps={(state, rowInfo, column) => {
            return {
              className: "h-64",
            };
          }}
          data={filteredData}
          columns={[
            {
              Header: "",
              Cell: (row) =>
                row.original.avatar ? (
                  <Avatar
                    className="mr-8"
                    alt={row.original.firstName}
                    src={URL_SITE + row.original.avatar.url}
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
              Header: "Société",
              accessor: "societe",
              filterable: true,
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo &&
                      (rowInfo.original.autreCategories ||
                        (rowInfo.original.ville &&
                          rowInfo.original.ville.id === 113))
                        ? "orange"
                        : null,
                  },
                };
              },
            },
            {
              Header: "Nom",
              accessor: "lastName",
              filterable: true,
            },
            {
              Header: "Prénom",
              accessor: "firstName",
              filterable: true,
            },

            {
              Header: "Téléphone",
              accessor: "phone",
              filterable: true,
            },
            {
              Header: "Ville",
              accessor: "ville.name",
              filterable: true,
              Cell: (row) => row.original.ville && row.original.ville.name,
            },
            {
              Header: "Date de création",
              accessor: "created",
              filterable: true,
              Filter: ({ filter, onChange }) => (
                <TextField
                  onChange={(event) => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : ""}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ),
              Cell: (row) =>
                moment(row.original.created).format("DD/MM/YYYY HH:mm"),
            },
            {
              Header: "Statut",
              accessor: "isactif",
              filterable: true,
              Cell: (row) =>
                row.original.isactif ? (
                  <Tooltip title="Activé">
                    <IconButton
                      className="text-green text-20"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        dispatch(
                          Actions.openDialog({
                            children: (
                              <React.Fragment>
                                <DialogTitle id="alert-dialog-title">
                                  Désactivation
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Voulez vous vraiment désactivé ce compte ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() =>
                                      dispatch(Actions.closeDialog())
                                    }
                                    variant="contained"
                                    color="primary"
                                  >
                                    Non
                                  </Button>
                                  <Button
                                    onClick={(ev) => {
                                      dispatch(
                                        Actions.activeAccount(
                                          row.original,
                                          false,
                                          parametres
                                        )
                                      );
                                      dispatch(Actions.closeDialog());
                                    }}
                                    color="primary"
                                    variant="outlined"
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
                      <Icon>check_circle</Icon>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Désactivé">
                    <IconButton
                      className="text-red text-20"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        dispatch(
                          Actions.openDialog({
                            children: (
                              <React.Fragment>
                                <DialogTitle id="alert-dialog-title">
                                  Activation
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Voulez vous vraiment activé ce compte ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() =>
                                      dispatch(Actions.closeDialog())
                                    }
                                    variant="contained"
                                    color="primary"
                                  >
                                    Non
                                  </Button>
                                  <Button
                                    onClick={(ev) => {
                                      dispatch(
                                        Actions.activeAccount(
                                          row.original,
                                          true,
                                          parametres
                                        )
                                      );
                                      dispatch(Actions.closeDialog());
                                    }}
                                    color="primary"
                                    variant="outlined"
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
                      <Icon>remove_circle</Icon>
                    </IconButton>
                  </Tooltip>
                ),
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={(event) => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : ""}
                >
                  <option value="">Tous</option>
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              ),
            },
            {
              Header: "Etape",
              accessor: "step",
              filterable: true,
              Cell: (row) =>
                row.original.step === 1 ? (
                  !row.original.isactif ? (
                    "Confirmation email"
                  ) : (
                    "Infos de la société"
                  )
                ) : row.original.step === 2 ? (
                  "Produits"
                ) : (
                  <span className="text-green">Inscription complète</span>
                ),
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={(event) => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : ""}
                >
                  <option value="">Tous</option>
                  <option value="-1">Confirmation email</option>
                  <option value="1">Infos de la société</option>
                  <option value="2">Produits</option>
                  <option value="3">Inscription complète</option>
                </select>
              ),
            },
            {
              Header: "",
              Cell: (row) => (
                <div className="flex items-center">
                  <Tooltip
                    title="Détails"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      props.history.push(
                        "/users/fournisseur/show/" + row.original.id
                      );
                    }}
                  >
                    <IconButton className="text-teal text-20">
                      <Icon>remove_red_eye</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Editer"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      props.history.push(
                        "/users/fournisseurs/" + row.original.id
                      );
                    }}
                  >
                    <IconButton className="text-orange text-20">
                      <Icon>edit</Icon>
                    </IconButton>
                  </Tooltip>
                </div>
              ),
            },
          ]}
          manual
          defaultSortDesc={true}
          pages={pageCount}
          page={parametres.page - 1}
          defaultPageSize={10}
          loading={loading}
          showPageSizeOptions={false}
          onPageChange={(pageIndex) => {
            parametres.page = pageIndex + 1;
            dispatch(Actions.setParametresData(parametres));
          }}
          onSortedChange={(newSorted, column, shiftKey) => {
            parametres.page = 1;
            parametres.filter.id = newSorted[0].id;
            parametres.filter.direction = newSorted[0].desc ? "desc" : "asc";
            dispatch(Actions.setParametresData(parametres));
          }}
          onFilteredChange={(filtered) => {
            parametres.page = 1;
            parametres.search = filtered;
            // _.debounce( dispatch(Actions.setParametresData(parametres)),3000)
            fn(parametres);
          }}
          noDataText="Aucun fournisseur trouvé"
          loadingText="Chargement..."
          ofText="sur"
        />
      </FuseAnimate>
    </div>
  );
}

export default withRouter(FournisseursTable);
