import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Icon,
} from "@material-ui/core";
//import ReactHtmlParser from 'react-html-parser';
import _ from "@lodash";
import { URL_SITE } from "@fuse/Constants";

const useStyles = makeStyles((theme) => ({
  mediaProduit: {
    height: 200,
  },
  cardContent: {
    maxHeight: 145,
    minHeight: 145,
  },
  card: {
    maxWidth: 260,
  },
  titre: {
    fontSize: "17px",
  },
}));

export default function Produit(props) {
  const classes = useStyles();
  const { produit } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea
        component="a"
        href={`/detail-produit/${produit.sousSecteurs.slug}/${produit.categorie.slug}/${produit.id}-${produit.slug}`}
      >
        <CardMedia
          className={classes.mediaProduit}
          image={
            produit.featuredImageId
              ? URL_SITE + produit.featuredImageId.url
              : "assets/images/ecommerce/product-placeholder.jpg"
          }
          title={produit.titre}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" className={classes.titre}>
            {_.capitalize(
              _.truncate(produit.titre, {
                length: 45,
              })
            )}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-16"
          >
            Réf.{produit.reference}
          </Typography>

          {produit.images.length > 0 ? (
            <Chip
              icon={<Icon className="text-16 mr-0">image</Icon>}
              label={produit.images.length}
              classes={{
                root: "h-24",
                label: "pl-4 pr-6 py-4 text-11",
              }}
              variant="outlined"
              className="mr-4"
            />
          ) : (
            ""
          )}
          {produit.videos ? (
            <Chip
              icon={<Icon className="text-16 mr-0">videocam</Icon>}
              label="1"
              classes={{
                root: "h-24",
                label: "pl-4 pr-6 py-4 text-11",
              }}
              variant="outlined"
              className="mr-4"
            />
          ) : (
            ""
          )}

          {produit.ficheTechnique ? (
            <Chip
              icon={<Icon className="text-16 mr-0">picture_as_pdf</Icon>}
              label="1 fiche technique"
              classes={{
                root: "h-24",
                label: "pl-4 pr-6 py-4 text-11",
              }}
              variant="outlined"
              className="mr-4"
            />
          ) : (
            ""
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Produit.propTypes = {
  produit: PropTypes.object,
};
