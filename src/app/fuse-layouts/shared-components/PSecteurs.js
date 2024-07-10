import React from "react";
import { Button, Icon, Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
function PSecteurs(props) {
  const classes = useStyles();
  return (
    <Button className="h-64" component={Link} to="/annuaire-entreprises">
      <Avatar className={classes.avatar}>
        <Icon>settings</Icon>
      </Avatar>
      <div className="hidden md:flex flex-col ml-12 items-start">
        <Typography className="text-11 capitalize" color="textSecondary">
          Parcourir les
        </Typography>
        <Typography className="text-11 capitalize" color="textSecondary">
          secteurs
        </Typography>
      </div>
    </Button>
  );
}

export default PSecteurs;
