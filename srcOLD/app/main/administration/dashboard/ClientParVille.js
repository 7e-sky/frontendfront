import React, { useState } from "react";
import {
  Card,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Widget4 from "./widgets/Widget4";
import Widget5 from "./widgets/Widget5";

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

function ClientParVille(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }
  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pr-4 flex flex-row items-center justify-between">
        <Typography variant="h6">Clients par ville</Typography>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="flex flex-row ">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons="on"
            classes={{ root: "w-ful" }}
          >
            <Tab className="normal-case" label="Fournisseurs" />
            <Tab className="normal-case" label="Acheteurs" />
          </Tabs>
        </div>

        {/** FOURNISSEURS */}
        {tabValue === 0 && <Widget4 />}

        {/** ACHETEURS */}
        {tabValue === 1 && <Widget5 />}
      </Collapse>
    </Card>
  );
}

export default React.memo(ClientParVille);
