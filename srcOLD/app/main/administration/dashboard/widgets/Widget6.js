import React, { useEffect, useState } from "react";
import {
  Card,
  IconButton,
  Typography,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Widget6(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const widget6 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget6);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    dispatch(Actions.getWidget6());
    return () => {
      dispatch(Actions.cleanUpWidget6());
    };
  }, [dispatch]);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pr-4 flex flex-row items-center justify-between">
        <Typography variant="h6">Top 10 Fournisseur</Typography>
        <div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      {widget6.loading && (
        <div className="flex p-16 justify-center ">
          <CircularProgress />
        </div>
      )}

      {widget6.data && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="h-200 sm:h-320 sm:pb-16 overflow-scroll">
            <table className="simple">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-right">consulté</th>
                  <th className="text-right">Tél. vu</th>
                </tr>
              </thead>
              <tbody>
                {widget6.data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.societe}</td>
                    <td className="text-right">{row.visite}</td>
                    <td className="text-right">{row.phone_vu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapse>
      )}
    </Card>
  );
}

export default React.memo(Widget6);
