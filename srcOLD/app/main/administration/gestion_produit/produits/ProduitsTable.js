import React, { useEffect, useState } from "react";
import {
  Chip,
  Tooltip,
  IconButton,
  Icon,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { URL_SITE, FuseUtils } from "@fuse";
import ReactTable from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import _ from "@lodash";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chip: {
    marginLeft: theme.spacing(1),
    padding: 2,
    background: "#ef5350",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
    height: 20,
  },
  chip2: {
    marginLeft: theme.spacing(1),
    padding: 2,
    background: "#4caf50",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
    height: 20,
  },
  chipOrange: {
    marginLeft: theme.spacing(1),
    padding: 2,
    background: "#ff9800",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
    height: 20,
  },
}));
function ProduitsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const produits = useSelector(({ produitsApp }) => produitsApp.produits.data);
  const loading = useSelector(
    ({ produitsApp }) => produitsApp.produits.loading
  );
  const pageCount = useSelector(
    ({ produitsApp }) => produitsApp.produits.pageCount
  );
  const parametres = useSelector(
    ({ produitsApp }) => produitsApp.produits.parametres
  );
  const searchText = useSelector(
    ({ produitsApp }) => produitsApp.produits.searchText
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

    if (produits) {
      setFilteredData(getFilteredArray(produits, searchText));
    }
  }, [produits, searchText]);

  if (!filteredData) {
    return null;
  }

  const run = (parametres) => dispatch(Actions.setParametresData(parametres));

  //call run function
  const fn = _.debounce(run, 1000);

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo, column) => {
          return {
            className: "h-64 cursor-pointer",
            onClick: (e, handleOriginal) => {
              if (rowInfo) {
                props.history.push("/products/" + rowInfo.original.id);
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
            accessor: "featuredImageId",
            Cell: (row) =>
              row.original.featuredImageId ? (
                <img
                  className="w-full block rounded"
                  src={URL_SITE + row.original.featuredImageId.url}
                  alt={row.original.reference}
                />
              ) : (
                <img
                  className="w-full block rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={row.original.reference}
                />
              ),
            className: "justify-center",
            width: 64,
            sortable: false,
            filterable: false,
          },
          /* {
            Header: "Fournisseur",
            className: "font-bold ",
            filterable: true,
            accessor: "fournisseur",
            Cell: (row) => (
              <Tooltip title="Détails du fournisseur">
                <Link
                  target="_blank"
                  to={"/users/fournisseur/show/" + row.original.fournisseur.id}
                  onClick={(ev) => ev.stopPropagation()}
                >
                  {row.original.fournisseur.societe &&
                    row.original.fournisseur.societe}
                </Link>
              </Tooltip>
            ),
          }, */
          {
            Header: "Ref",
            accessor: "reference",
            filterable: true,
          },
          {
            Header: "Titre",
            accessor: "titre",
            filterable: true,
          },
          {
            Header: "Statut",
            accessor: "isValid",
            filterable: true,
            Cell: (row) => (
              <div className="flex items-center">
                {!row.original.isValid ? (
                  <Chip className={classes.chipOrange} label="En attente" />
                ) : (
                  <Chip className={classes.chip2} label="Publié" />
                )}
                {row.original.isSelect ? (
                  <Chip
                    className={classes.chip2}
                    label="Produit de la semaine"
                  />
                ) : (
                  ""
                )}
              </div>
            ),
            Filter: ({ filter, onChange }) => (
              <select
                onChange={(event) => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : ""}
              >
                <option value="">Tous</option>
                <option value="true">Publié</option>
                <option value="false">En attente</option>
              </select>
            ),
          },
          {
            Header: "Description",
            accessor: "description",
            filterable: true,

            Cell: (row) => (
              <div className="flex items-center">
                {_.capitalize(
                  _.truncate(row.original.description, {
                    length: 15,
                    separator: " ",
                  })
                )}
              </div>
            ),
          },
          {
            Header: "PU",
            className: "font-bold",
            accessor: "pu",
            filterable: true,
            Cell: (row) => (
              <div className="flex items-center">
                {row.original.pu.toLocaleString(
                  undefined, // leave undefined to use the browser's locale,
                  // or use a string like 'en-US' to override it.
                  { minimumFractionDigits: 2 }
                ) +
                  (row.original.currency
                    ? " " + row.original.currency.name
                    : "")}
              </div>
            ),
          },
          {
            Header: "Secteur",
            className: "font-bold",
            filterable: true,
            accessor: "secteur.name",
            Cell: (row) =>
              row.original.secteur ? row.original.secteur.name : "N/A",
          },
          {
            Header: "Activité",
            className: "font-bold",
            filterable: true,
            accessor: "sousSecteurs.name",
            Cell: (row) =>
              row.original.sousSecteurs
                ? row.original.sousSecteurs.name
                : "N/A",
          },
          {
            Header: "Produit",
            className: "font-bold",
            filterable: true,
            accessor: "categorie.name",
            Cell: (row) =>
              row.original.categorie ? row.original.categorie.name : "N/A",
          },
          {
            Header: "Date de création",
            filterable: true,
            accessor: "created",
            Cell: (row) => moment(row.original.created).format("DD/MM/YYYY"),
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
          },
          {
            Header: "",
            Cell: (row) => (
              <div className="flex items-center">
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
                                  Voulez vous vraiment supprimer ce produit ?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  variant="contained"
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
                                      Actions.removeProduit(
                                        row.original,
                                        parametres
                                      )
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
                <Tooltip title="Modifier">
                  <IconButton className="text-orange text-20">
                    <Icon>edit</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            ),
          },
        ]}
        manual
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
          fn(parametres);
        }}
        noDataText="Aucun produit trouvé"
        loadingText="Chargement..."
        ofText="sur"
      />
    </FuseAnimate>
  );
}

export default withRouter(ProduitsTable);
