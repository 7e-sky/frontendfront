import React from "react";
import { Avatar, Grid, Typography, Icon } from "@material-ui/core";
import { URL_SITE } from "@fuse";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 72,
    height: 72,
    padding: 8,
    boxSizing: "content-box",
    "& > img": {
      borderRadius: "50%",
    },
  },
  tousCat: {
    width: 72,
    height: 72,
    padding: 8,
    boxSizing: "content-box",
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Categories(props) {
  const { categories } = props;
  const classes = useStyles();

  return categories.length ? (
    <Grid container className="justify-center p-20">
      {categories.map((cat, index) => (
        <Grid
          item
          xs={6}
          sm={1}
          key={index}
          component={Link}
          to={`/vente-produits/${cat.slug}`}
          className="flex flex-col items-center "
        >
          <Avatar
            className={classes.avatar}
            alt={cat.name}
            src={URL_SITE + "/images/secteur/" + cat.url}
          />
          <Typography
            variant="subtitle1"
            className="text-center text-11 font-bold text-black "
          >
            {cat.name}
          </Typography>
        </Grid>
      ))}
      <Grid
        item
        xs={6}
        sm={1}
        component={Link}
        to={`/annuaire-entreprises`}
        className="flex flex-col items-center "
      >
        <Avatar className={classes.tousCat}>
          <Icon>arrow_forward_ios</Icon>
        </Avatar>
        <Typography
          variant="subtitle1"
          className="text-center text-11 font-bold text-black "
        >
          Tous les catégories
        </Typography>
      </Grid>
    </Grid>
  ) : (
    ""
  );
}
export default Categories;
