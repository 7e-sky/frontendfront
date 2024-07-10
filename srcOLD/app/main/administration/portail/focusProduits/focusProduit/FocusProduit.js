import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import { FusePageCarded, FuseAnimate, SelectReactFormsy } from "@fuse";
import {
  Typography,
  Icon,
  Grid,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import green from "@material-ui/core/colors/green";
import ContentLoader from "react-content-loader";
import _ from "@lodash";
import { URL_SITE } from "@fuse/Constants";
import Formsy from "formsy-react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  media: {
    height: 140,
  },
}));
function FocusProduit(props) {
  const dispatch = useDispatch();
  const produit = useSelector(
    ({ focusProduitsApp }) => focusProduitsApp.focusProduit
  );
  const [fournisseur, setFournisseur] = useState(null);
  const [categorie, setCategorie] = useState(null);
  const { form, setForm } = useForm(null);
  const classes = useStyles(props);

  useEffect(() => {
    function updateFocusProduitState() {
      const params = props.match.params;
      const { produitId } = params;
      dispatch(Actions.getFocusProduit(produitId));
      dispatch(Actions.getFournisseurHasProducts());
    }

    updateFocusProduitState();
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (produit.data && !form) ||
      (produit.data && form && produit.data.id !== form.id)
    ) {
      setForm({ ...produit.data });
      if (produit.data.produit) {
        setFournisseur({
          value: produit.data.produit.fournisseur.id,
          label: produit.data.produit.fournisseur.societe,
        });
        setCategorie({
          value: produit.data.produit.categorie.id,
          label: produit.data.produit.categorie.name,
        });
        dispatch(
          Actions.GetAllCategorieByFournisseur(
            produit.data.produit.fournisseur.id
          )
        );
        dispatch(
          Actions.GetProductsByCategorieByFournisseur(
            produit.data.produit.fournisseur.id,
            produit.data.produit.categorie.id
          )
        );
      }
    }
  }, [dispatch, form, produit.data, setForm]);

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/admin/focus-produits"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Retour
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.produit ? form.produit.titre : "Mettre à jour"}
                    </Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
          </div>
        )
      }
      content={
        !produit.loading
          ? form && (
              <div className="p-10  sm:p-24 max-w-2xl">
                <Formsy>
                  <Grid
                    container
                    spacing={2}
                    className="items-center justify-center"
                  >
                    <Grid item sm={4}>
                      <SelectReactFormsy
                        id="fournisseur"
                        name="fournisseur"
                        value={fournisseur}
                        placeholder="Sélectionner un fournisseur"
                        textFieldProps={{
                          label: "Fournisseurs",
                          InputLabelProps: {
                            shrink: true,
                          },
                          variant: "outlined",
                        }}
                        className="mt-8"
                        options={produit.fournisseurs}
                        onChange={(value) => {
                          setFournisseur(value);
                          dispatch(
                            Actions.GetAllCategorieByFournisseur(value.value)
                          );
                          setCategorie("");
                        }}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <SelectReactFormsy
                        id="categorie"
                        name="categorie"
                        value={categorie}
                        placeholder="Sélectionner un catégorie"
                        textFieldProps={{
                          label: "Catégories",
                          InputLabelProps: {
                            shrink: true,
                          },
                          variant: "outlined",
                        }}
                        className="mt-8"
                        options={produit.categories}
                        onChange={(value) => {
                          setCategorie(value);
                        }}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <Button
                        size="large"
                        className="mt-8"
                        variant="contained"
                        disabled={!fournisseur || !categorie}
                        onClick={() => {
                          dispatch(
                            Actions.GetProductsByCategorieByFournisseur(
                              fournisseur.value,
                              categorie.value
                            )
                          );
                        }}
                        color="primary"
                      >
                        Rechercher
                      </Button>
                    </Grid>
                  </Grid>
                </Formsy>
                <Divider className="mb-16 mt-16" />
                {produit.loadingProducts ? (
                  <ContentLoader
                    viewBox="0 0 1360 900"
                    height={900}
                    width={1360}
                    speed={2}
                    {...props}
                  >
                    <rect
                      x="30"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="30"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="30"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                    <rect
                      x="250"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="250"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="250"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                    <rect
                      x="470"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="470"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="470"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                    <rect
                      x="690"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="690"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="690"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                    <rect
                      x="910"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="910"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="910"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                    <rect
                      x="1130"
                      y="20"
                      rx="8"
                      ry="8"
                      width="200"
                      height="200"
                    />
                    <rect
                      x="1130"
                      y="250"
                      rx="0"
                      ry="0"
                      width="200"
                      height="18"
                    />
                    <rect
                      x="1130"
                      y="275"
                      rx="0"
                      ry="0"
                      width="120"
                      height="20"
                    />
                  </ContentLoader>
                ) : (
                  <Grid container spacing={2}>
                    {produit.products &&
                      produit.products.map((item, index) => (
                        <Grid item sm={3} xs={6} key={index}>
                          <Card className={classes.card}>
                            <CardMedia
                              className={classes.media}
                              image={
                                item.featuredImageId
                                  ? URL_SITE + item.featuredImageId.url
                                  : "assets/images/ecommerce/product-placeholder.jpg"
                              }
                              title={item.titre}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h5"
                              >
                                {_.capitalize(
                                  _.truncate(item.titre, {
                                    length: 18,
                                  })
                                )}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Réf.{item.reference}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className="mb-16 mt-8"
                              >
                                {_.capitalize(
                                  _.truncate(item.description, {
                                    length: 150,
                                  })
                                )}
                              </Typography>
                              {item.images.length > 0 ? (
                                <Chip
                                  icon={
                                    <Icon className="text-16 mr-0">image</Icon>
                                  }
                                  label={item.images.length}
                                  classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes,
                                  }}
                                  variant="outlined"
                                  className="mr-4"
                                />
                              ) : (
                                ""
                              )}
                              {item.videos ? (
                                <Chip
                                  icon={
                                    <Icon className="text-16 mr-0">
                                      videocam
                                    </Icon>
                                  }
                                  label="1"
                                  classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes,
                                  }}
                                  variant="outlined"
                                  className="mr-4"
                                />
                              ) : (
                                ""
                              )}

                              {item.ficheTechnique ? (
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
                                    ...props.classes,
                                  }}
                                  variant="outlined"
                                  className="mr-4"
                                />
                              ) : (
                                ""
                              )}
                            </CardContent>
                            <CardActions className="flex justify-center">
                              {produit.data.produit &&
                              produit.data.produit.id === item.id ? (
                                <Chip
                                  icon={
                                    <Icon className="text-16 mr-0">done</Icon>
                                  }
                                  label="Selectionné"
                                  classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes,
                                  }}
                                  color="secondary"
                                  className="mr-4"
                                />
                              ) : (
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => {
                                    dispatch(
                                      Actions.putFocusProduit(
                                        item["@id"],
                                        produit.data["@id"]
                                      )
                                    );
                                  }}
                                  color="primary"
                                >
                                  Sélectionner
                                </Button>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                )}
              </div>
            )
          : ""
      }
      innerScroll
    />
  );
}

export default withReducer("focusProduitsApp", reducer)(FocusProduit);
