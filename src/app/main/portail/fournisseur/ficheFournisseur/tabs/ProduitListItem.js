import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useDispatch, useSelector } from "react-redux";
import { FuseAnimateGroup } from "@fuse";
import { URL_SITE } from "@fuse/Constants";
import _ from "@lodash";
import { Link } from "react-router-dom";
import { Chip, Icon, IconButton, Select } from "@material-ui/core";
import ContentLoader from "react-content-loader";
import * as Actions from "../../store/actions";

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 10,
    maxWidth: "100%",
  },
  image: {
    width: 218,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "150px",
  },
});

function ProduitListItem(props) {
  const dispatch = useDispatch();
  const pageCount = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.pageCount
  );
  const produits = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.produits
  );
  const loadingProduits = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.loadingProduits
  );
  const parametres = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.parametres
  );
  const { classes } = props;

  function handlePreviousClick() {
    parametres.page = Math.max(parametres.page - 1, 1);
    dispatch(Actions.setParametresData(parametres));
    document.querySelector(".st").scrollTop = 0;
  }

  function handleNextClick() {
    parametres.page = Math.min(parametres.page + 1, pageCount);
    dispatch(Actions.setParametresData(parametres));
    document.querySelector(".st").scrollTop = 0;
  }

  function handleChangeItems(ev) {
    parametres.page = 1;
    parametres.itemsPerPage = ev.target.value;
    document.querySelector(".st").scrollTop = 0;
    dispatch(Actions.setParametresData(parametres));
  }
  return (
    <div className={classes.root}>
      {loadingProduits ? (
        generate(
          <ContentLoader
            speed={2}
            width={400}
            height={100}
            viewBox="0 0 400 100"
          >
            <rect x="2" y="8" rx="0" ry="0" width="105" height="83" />
            <rect x="120" y="10" rx="0" ry="0" width="133" height="10" />
            <rect x="119" y="31" rx="0" ry="0" width="216" height="21" />
            <rect x="120" y="79" rx="2" ry="2" width="43" height="12" />
            <rect x="130" y="89" rx="2" ry="2" width="43" height="0" />
            <rect x="172" y="80" rx="2" ry="2" width="43" height="11" />
            <rect x="223" y="80" rx="2" ry="2" width="43" height="11" />
            <rect x="120" y="61" rx="0" ry="0" width="44" height="9" />
            <rect x="350" y="11" rx="0" ry="0" width="46" height="8" />
          </ContentLoader>
        )
      ) : (
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn",
          }}
        >
          {produits.length > 0 ? (
            produits.map((produit, index) => (
              <Paper className={classes.paper} key={index}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase
                      className={classes.image}
                      component={Link}
                      to={`/detail-produit/${produit.sousSecteurs.slug}/${produit.categorie.slug}/${produit.id}-${produit.slug}`}
                    >
                      <img
                        className={classes.img}
                        alt={produit.titre}
                        src={
                          produit.featuredImageId
                            ? URL_SITE + produit.featuredImageId.url
                            : "assets/images/ecommerce/product-placeholder.jpg"
                        }
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          component={Link}
                          to={`/detail-produit/${produit.sousSecteurs.slug}/${produit.categorie.slug}/${produit.id}-${produit.slug}`}
                          variant="h6"
                        >
                          {produit.titre}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {_.capitalize(
                            _.truncate(produit.description, {
                              length: 70,
                            })
                          )}
                          <Link
                            to={`/detail-produit/${produit.sousSecteurs.slug}/${produit.categorie.slug}/${produit.id}-${produit.slug}`}
                            className="ml-2 text-blue"
                          >
                            Voir détails
                          </Link>
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mb-8"
                          color="textSecondary"
                        >
                          Réf: {produit.reference}
                        </Typography>
                        {produit.images && produit.images.length > 0 ? (
                          <Chip
                            icon={<Icon className="text-16 mr-0">image</Icon>}
                            label={produit.images.length}
                            classes={{
                              root: "h-24",
                              label: "pl-4 pr-6 py-4 text-11",
                              deleteIcon: "w-16 ml-0",
                            }}
                            variant="outlined"
                            className="mr-4 h-24"
                          />
                        ) : (
                          ""
                        )}

                        {produit.videos ? (
                          <Chip
                            icon={
                              <Icon className="text-16 mr-0">videocam</Icon>
                            }
                            label="1"
                            classes={{
                              root: "h-24",
                              label: "pl-4 pr-6 py-4 text-11",
                              deleteIcon: "w-16 ml-0",
                            }}
                            variant="outlined"
                            className="mr-4 h-24"
                          />
                        ) : (
                          ""
                        )}

                        {produit.ficheTechnique ? (
                          <Chip
                            icon={
                              <Icon className="text-16 mr-0">
                                picture_as_pdf
                              </Icon>
                            }
                            label="1 fiche technique"
                            classes={{
                              root: "h-24",
                              label: "pl-4 pr-6 py-4 text-11",
                              deleteIcon: "w-16 ml-0",
                            }}
                            variant="outlined"
                            className="mr-4 h-24"
                          />
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        color="secondary"
                        className="font-600"
                      >
                        {produit.pu
                          ? parseFloat(produit.pu).toLocaleString(
                              undefined, // leave undefined to use the browser's locale,
                              // or use a string like 'en-US' to override it.
                              { minimumFractionDigits: 2 }
                            ) +
                            (produit.currency
                              ? " " + produit.currency.name
                              : "")
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <div className="text-center mt-16">
              Aucun produit n'est ajouté par cette entreprise
            </div>
          )}
          {produits.length > 0 && (
            <Grid container spacing={2} className="justify-between mt-16">
              <Grid item xs={6}>
                Montrer:&ensp;
                <Select
                  className="text-13"
                  native
                  value={parametres.itemsPerPage}
                  onChange={handleChangeItems}
                  inputProps={{
                    name: "ItemsPerPage",
                  }}
                >
                  <option value="10">10</option>
                  <option value="50">50 </option>
                  <option value="100">100</option>
                </Select>
              </Grid>

              <Grid item xs={6} className="text-right">
                <IconButton
                  aria-label="Previous"
                  className={classes.margin}
                  disabled={parametres.page === 1}
                  onClick={handlePreviousClick}
                >
                  <Icon>arrow_back</Icon>
                </IconButton>
                {parametres.page} / {pageCount}
                <IconButton
                  aria-label="Next"
                  disabled={parametres.page === pageCount}
                  className={classes.margin}
                  onClick={handleNextClick}
                >
                  <Icon>arrow_forward</Icon>
                </IconButton>
              </Grid>
            </Grid>
          )}
        </FuseAnimateGroup>
      )}
    </div>
  );
}

ProduitListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProduitListItem);
