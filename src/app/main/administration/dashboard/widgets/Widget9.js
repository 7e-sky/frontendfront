import React, { useEffect, useState } from "react";
import {
  Card,
  CircularProgress,
  Tabs,
  Tab,
  Tooltip,
  Chip,
  Typography,
} from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
function Widget9(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const widget9 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget9);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (tabValue < 0 || tabValue > 1) {
      return;
    }

    tabValue === 0
      ? dispatch(Actions.getWidgetCommandeAbonnement())
      : dispatch(Actions.getWidgetCommandeJeton());

    return () => {
      dispatch(Actions.cleanUpWidget9());
    };
  }, [dispatch, tabValue]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="relative p-24 flex flex-row items-center justify-between">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-ful" }}
        >
          <Tab className="normal-case" label="Commandes abonnements" />
          <Tab className="normal-case" label="Commandes jetons" />
        </Tabs>
        <Typography>5 dernières commandes</Typography>
      </div>

      {tabValue === 0 && (
        <div>
          {widget9.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget9.data && (
            <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
              <table className="simple">
                <thead>
                  <tr>
                    <th className="text-left">Société</th>
                    <th className="text-left">Pack</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Etat</th>
                  </tr>
                </thead>
                <tbody>
                  {widget9.data.length > 0 ? (
                    widget9.data.map((row, index) => (
                      <tr key={index}>
                        <td className="text-left">
                          {row.fournisseur && (
                            <Tooltip title="Détails du fournisseur">
                              <Link
                                to={
                                  "/users/fournisseur/show/" +
                                  row.fournisseur.id
                                }
                                onClick={(ev) => ev.stopPropagation()}
                              >
                                {row.fournisseur.societe}
                              </Link>
                            </Tooltip>
                          )}
                        </td>
                        <td className="text-left">
                          {row.offre && row.offre.name}
                        </td>
                        <td className="text-left">
                          {moment(row.created).format("DD/MM/YYYY HH:mm")}
                        </td>
                        <td className="text-left">
                          {row.statut === false ? (
                            <Chip
                              className={classes.chipOrange}
                              label="En attente"
                            />
                          ) : (
                            <Chip className={classes.chip2} label="Traitée" />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Aucun résultat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {tabValue === 1 && (
        <div>
          {widget9.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget9.data && (
            <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
              <table className="simple">
                <thead>
                  <tr>
                    <th className="text-left">Société</th>
                    <th className="text-left">Nb. jetons</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Etat</th>
                  </tr>
                </thead>
                <tbody>
                  {widget9.data.length > 0 ? (
                    widget9.data.map((row, index) => (
                      <tr key={index}>
                        <td className="text-left">
                          {row.fournisseur && (
                            <Tooltip title="Détails du fournisseur">
                              <Link
                                to={
                                  "/users/fournisseur/show/" +
                                  row.fournisseur.id
                                }
                                onClick={(ev) => ev.stopPropagation()}
                              >
                                {row.fournisseur.societe}
                              </Link>
                            </Tooltip>
                          )}
                        </td>
                        <td className="text-left">{row.nbrJeton}</td>

                        <td className="text-left">
                          {moment(row.created).format("DD/MM/YYYY HH:mm")}
                        </td>
                        <td className="text-left">
                          {row.isUse === false ? (
                            <Chip
                              className={classes.chipOrange}
                              label="En attente"
                            />
                          ) : (
                            <Chip className={classes.chip2} label="Traitée" />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Aucun résultat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default React.memo(Widget9);
