import React, { useEffect, useState } from "react";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FuseUtils, URL_SITE } from "@fuse";
import ReactTable from "react-table";
import _ from "@lodash";

function ActualitesTable(props) {
  const dispatch = useDispatch();
  const actualites = useSelector(
    ({ actualiteApp }) => actualiteApp.actualites.data
  );
  const loading = useSelector(
    ({ actualiteApp }) => actualiteApp.actualites.loading
  );
  const pageCount = useSelector(
    ({ actualiteApp }) => actualiteApp.actualites.pageCount
  );
  const parametres = useSelector(
    ({ actualiteApp }) => actualiteApp.actualites.parametres
  );

  const searchText = useSelector(
    ({ actualiteApp }) => actualiteApp.actualites.searchText
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

    if (actualites) {
      setFilteredData(getFilteredArray(actualites, searchText));
    }
  }, [actualites, searchText]);

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
                  "/admin/actualites/" + rowInfo.original.slug
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
            accessor: "image",
            Cell: (row) =>
              row.original.image ? (
                <img
                  className="w-full block rounded"
                  src={URL_SITE + row.original.image.url}
                  alt={row.original.titre}
                />
              ) : (
                <img
                  className="w-full block rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={row.original.titre}
                />
              ),
            className: "justify-center",
            width: 64,
            sortable: false,
            filterable: false,
          },
          {
            Header: "Titre",
            accessor: "titre",
            filterable: false,
            Cell: (row) => (
              <div className="flex items-center">
                {_.capitalize(
                  _.truncate(row.original.titre, {
                    length: 20,
                  })
                )}
              </div>
            ),
          },
          {
            Header: "Description",
            accessor: "description",
            filterable: false,
            Cell: (row) => (
              <div className="flex items-center">
                {_.capitalize(
                  _.truncate(row.original.description, {
                    length: 50,
                  })
                )}
              </div>
            ),
          },
          {
            Header: "Date de création",
            accessor: "created",
            filterable: false,
            Cell: (row) =>
              moment(row.original.created).format("DD/MM/YYYY HH:mm"),
          },

          {
            Header: "Publiée",
            accessor: "isActive",
            Cell: (row) =>
              row.original.isActive ? (
                <Tooltip title="Publiée">
                  <IconButton
                    className="text-green text-20"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      dispatch(
                        Actions.PublishActualite(
                          row.original,
                          false,
                          parametres
                        )
                      );
                    }}
                  >
                    <Icon>check_circle</Icon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Privée">
                  <IconButton
                    className="text-red text-20"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      dispatch(
                        Actions.PublishActualite(row.original, true, parametres)
                      );
                    }}
                  >
                    <Icon>remove_circle</Icon>
                  </IconButton>
                </Tooltip>
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
                        Actions.removeActualite(row.original, parametres)
                      );
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editer">
                  <IconButton className="text-teal text-20">
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
        noDataText="No Actualite found"
        loadingText="Chargement..."
        ofText="sur"
      />
    </FuseAnimate>
  );
}

export default withRouter(ActualitesTable);
