import React, { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from "@material-ui/core";
import { FuseUtils, FuseAnimate, URL_SITE } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
//import AdminsMultiSelectMenu from './AdminsMultiSelectMenu';
import moment from "moment";
function AdminsList(props) {
  const dispatch = useDispatch();
  const admins = useSelector(({ adminsApp }) => adminsApp.admins.entities);
  const user = useSelector(({ auth }) => auth.user);
  // const selectedAdminsIds = useSelector(({adminsApp}) => adminsApp.admins.selectedAdminsIds);
  const searchText = useSelector(
    ({ adminsApp }) => adminsApp.admins.searchText
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

    if (admins) {
      setFilteredData(getFilteredArray(admins, searchText));
    }
  }, [admins, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          Il n'y a pas d'admins!
        </Typography>
      </div>
    );
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo, column) => {
          return {
            className: "cursor-pointer",
            onClick: (e, handleOriginal) => {
              if (rowInfo) {
                dispatch(Actions.openEditAdminsDialog(rowInfo.original));
              }
            },
          };
        }}
        data={filteredData}
        columns={[
          /* {
                        Header   : () => (
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
                                    event.target.checked ? dispatch(Actions.selectAllAdmins()) : dispatch(Actions.deSelectAllAdmins());
                                }}
                                checked={selectedAdminsIds.length === Object.keys(admins).length && selectedAdminsIds.length > 0}
                                indeterminate={selectedAdminsIds.length !== Object.keys(admins).length && selectedAdminsIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedAdminsIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedAdmins(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedAdminsIds.length > 0 && (
                                <AdminsMultiSelectMenu/>
                            )
                        ),
                        width    : 40,
                        accessor : "",
                        Cell  : row => (
                            <div className="items-center">
                               
                            </div>
                        )
                    },*/

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
            Header: "Email",
            accessor: "email",
            filterable: true,
          },
          {
            Header: "Téléphone",
            accessor: "phone",
            filterable: true,
          },
          {
            Header: "Date de création",
            Cell: (row) =>
              moment(row.original.created).format("DD/MM/YYYY HH:mm"),
          },
          {
            Header: "Statut",
            Cell: (row) =>
              user.id !== row.original.id ? (
                row.original.isactif ? (
                  <Tooltip title="Activé">
                    <IconButton
                      className="text-green text-20"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        if (user.id !== row.original.id)
                          dispatch(Actions.activeAccount(row.original, false));
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
                        dispatch(Actions.activeAccount(row.original, true));
                      }}
                    >
                      <Icon>remove_circle</Icon>
                    </IconButton>
                  </Tooltip>
                )
              ) : (
                <IconButton className="text-20">
                  <Icon>check_circle</Icon>
                </IconButton>
              ),
          },
          {
            Header: "",
            width: 64,
            Cell: (row) =>
              user.id !== row.original.id ? (
                <div className="flex items-center">
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
                                    dispatch(Actions.removeAdmin(row.original));
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
                </div>
              ) : (
                <div className="flex items-center">
                  <IconButton className="text-20">
                    <Icon>delete</Icon>
                  </IconButton>
                </div>
              ),
          },
        ]}
        defaultPageSize={10}
        noDataText="No admins found"
      />
    </FuseAnimate>
  );
}

export default AdminsList;
