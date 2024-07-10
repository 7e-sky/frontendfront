import React, { useEffect, useState } from "react";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { FuseAnimate, URL_SITE } from "@fuse";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import FuseUtils from "@fuse/FuseUtils";
import ReactTable from "react-table";

function FocusProduitsTable(props) {
  const focusProduits = useSelector(
    ({ focusProduitsApp }) => focusProduitsApp.focusProduits.data
  );
  const searchText = useSelector(
    ({ focusProduitsApp }) => focusProduitsApp.focusProduits.searchText
  );
  const loading = useSelector(
    ({ focusProduitsApp }) => focusProduitsApp.focusProduits.loading
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

    if (focusProduits) {
      setFilteredData(getFilteredArray(focusProduits, searchText));
    }
  }, [focusProduits, searchText]);

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
                  "/admin/focus-produits/" + rowInfo.original.id
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
            accessor: "produit",
            Cell: (row) =>
              row.original.produit && row.original.produit.featuredImageId ? (
                <img
                  className="w-full block rounded"
                  src={URL_SITE + row.original.produit.featuredImageId.url}
                  alt=""
                />
              ) : (
                <img
                  className="w-64 block rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt=""
                />
              ),
            className: "justify-center",
            width: 128,
            sortable: false,
            filterable: false,
          },
          {
            Header: "Fournisseur",
            accessor: "produit",
            filterable: false,
            Cell: (row) =>
              row.original.produit && row.original.produit.fournisseur
                ? row.original.produit.fournisseur.societe
                : "N/A",
          },
          {
            Header: "Réf.Produit",
            accessor: "produit",
            filterable: false,
            Cell: (row) =>
              row.original.produit ? row.original.produit.reference : "N/A",
          },
          {
            Header: "Catégorie",
            accessor: "produit",
            filterable: false,
            Cell: (row) =>
              row.original.produit && row.original.produit.categorie
                ? row.original.produit.categorie.name
                : "N/A",
          },
          {
            Header: "statut",
            accessor: "updated",
            filterable: false,
            Cell: (row) =>
              row.original.produit
                ? "Actif (" + moment(row.original.updated).toNow(moment()) + ")"
                : "N/A",
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
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        loading={loading}
        noDataText="No Produit found"
        loadingText="Chargement..."
        ofText="sur"
      />
    </FuseAnimate>
  );
}

export default withRouter(FocusProduitsTable);
