import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {
  List,
  ListItem,
  Icon,
  ListItemText,
  Button,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { URL_SITE } from "@fuse/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "36.25%", // 16:9
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  btn: {
    fontSize: 11,
    padding: "0px 8px",
  },
  content: {
    minHeight: 156,
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { secteur } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={clsx(classes.title)} variant="h6">
            {secteur.name}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          secteur.url
            ? URL_SITE + "/images/secteur/" + secteur.url
            : "https://source.unsplash.com/collection/9456871/1600x900"
        }
        title={secteur.name}
      />
      <CardContent className={clsx(classes.content, "p-0")}>
        <List dense={true}>
          {secteur.sousSecteurs &&
            secteur.sousSecteurs.map((sousSecteur, i) => (
              <React.Fragment key={i}>
                <ListItem
                  button
                  component="a"
                  href={`/vente-produits/${secteur.slug}/${sousSecteur.slug}`}
                >
                  <Icon className="text-16 arrow-icon">
                    keyboard_arrow_right
                  </Icon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        type="body2"
                        className="normal-case"
                        style={{ fontSize: 12 }}
                      >
                        {sousSecteur.name + " (" + sousSecteur.count + ")"}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={`/annuaire-entreprises/${secteur.id}-${secteur.slug}`}
          className={clsx(classes.btn)}
          variant="outlined"
        >
          VOIR TOUT LE SECTEUR{" "}
          <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}
