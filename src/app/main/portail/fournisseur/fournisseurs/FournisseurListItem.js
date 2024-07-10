import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useDispatch, useSelector } from "react-redux";
import { FuseAnimateGroup, FuseAnimate } from "@fuse";
import { URL_SITE } from "@fuse/Constants";
import _ from "@lodash";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Chip, Icon, IconButton, Select, Button } from "@material-ui/core";
import ContentLoader from "react-content-loader";
import * as Actions from "../store/actions";

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
    width: 150,
    height: 150,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "150px",
  },
});

function FournisseurListItem(props) {
  const dispatch = useDispatch();
  const pageCount = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseurs.pageCount
  );
  const fournisseurs = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseurs.data
  );
  const loading = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseurs.loading
  );
  const parametres = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseurs.parametres
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
      {loading ? (
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
          {fournisseurs &&
            fournisseurs.map((fournisseur, index) => (
              <Paper className={classes.paper} key={index}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase
                      className={clsx(classes.image)}
                      component="a"
                      href={
                        fournisseur &&
                        `/entreprise/${fournisseur.id}-${fournisseur.slug}`
                      }
                    >
                      <img
                        className={clsx(classes.img)}
                        alt={fournisseur.societe}
                        src={
                          fournisseur.avatar
                            ? URL_SITE + fournisseur.avatar.url
                            : "assets/images/ecommerce/product-placeholder.jpg"
                        }
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          component="a"
                          href={
                            fournisseur &&
                            `/entreprise/${fournisseur.id}-${fournisseur.slug}`
                          }
                          className="uppercase"
                          variant="h6"
                        >
                          {fournisseur.societe}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {_.capitalize(
                            _.truncate(fournisseur.description, {
                              length: 70,
                            })
                          )}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="mb-16 font-600"
                        >
                          Pays, ville / Fournisseur
                        </Typography>
                        <br />
                        <Chip
                          icon={
                            <Icon className="text-16 mr-0">location_on</Icon>
                          }
                          label={
                            (fournisseur.pays ? fournisseur.pays.name : "") +
                            (fournisseur.ville
                              ? ", " + fournisseur.ville.name
                              : "")
                          }
                          classes={{
                            root: clsx("h-24"),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                          }}
                          className="mr-4"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        Fournisseur de :
                        {fournisseur.categories &&
                          fournisseur.categories.map(
                            (item, index) =>
                              index < 3 && (
                                <Chip
                                  label={_.capitalize(item.name)}
                                  classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                  }}
                                  onClick={() =>
                                    item.sousSecteurs[0] &&
                                    props.history.push({
                                      pathname:
                                        "/entreprises/" +
                                        item.sousSecteurs[0].secteur.slug +
                                        "/" +
                                        item.sousSecteurs[0].slug +
                                        "/" +
                                        item.slug,
                                    })
                                  }
                                  key={index}
                                  variant="outlined"
                                  className="ml-4 mb-4 h-24"
                                />
                              )
                          )}
                      </Grid>
                    </Grid>
                    <Grid item>
                      {fournisseur.id && (
                        <FuseAnimate
                          animation="transition.slideRightIn"
                          delay={300}
                        >
                          <Button
                            size="small"
                            onClick={(ev) =>
                              dispatch(
                                Actions.openNewContactFournisseurDialog(
                                  fournisseur.id
                                )
                              )
                            }
                            className="mb-8 text-12 mt-2 w-full items-center"
                            color="primary"
                            variant="outlined"
                          >
                            <Icon className="mr-2">email</Icon>Contactez cette
                            entreprise
                          </Button>
                        </FuseAnimate>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          {fournisseurs && (
            <Grid container spacing={2} className="justify-between mt-16">
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6} className="text-right">
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

FournisseurListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FournisseurListItem);
