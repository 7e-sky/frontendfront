import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Tabs,
  Tab,
  Typography,
  Paper,
  Avatar,
  Icon,
  CardContent,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { FuseAnimate } from "@fuse";
import { URL_SITE } from "@fuse/Constants";
import * as Actions from "../store/actions";
import { Helmet } from "react-helmet";
import InfoEntreprise from "./tabs/InfoEntreprise";
import Produits from "./tabs/Produits";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import LinearProgress from "@material-ui/core/LinearProgress";
import { InlineShareButtons } from "sharethis-reactjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showMessage } from "app/store/actions/fuse";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  businessIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontSize: 40,
    width: 40,
    height: 40,
    pointerEvents: "none",
  },
  businessDownIcon: {
    position: "absolute",
    top: 28,
    left: 25,
    color: "#cbd5e0",
    fontSize: 80,
    width: 80,
    height: 80,
    pointerEvents: "none",
  },
  icon: {
    fontSize: 64,
  },
  avatar: {
    width: 80,
    height: 80,
    padding: 8,
    boxSizing: "content-box",
  },
  fiche: {
    marginTop: theme.spacing(4),
    minHeight: 260,
    maxHeight: 260,
    backgroundColor: theme.palette.primary.main,
    backgroundImage:
      "url(https://source.unsplash.com/collection/9631824/1600x900)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  bigAvatar: {
    width: 150,
    height: 150,
    borderWidth: 6,
    borderStyle: "solid",
    borderColor: "gray",
  },
  title: {
    marginTop: 10,
    marginRight: 60,
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "rgba(0,0,0,.4)",
  },
  shadow: {
    "text-shadow": "1px 1px 1px #000",
  },
  position: {
    marginTop: "-63px",
    marginBottom: "20px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  headerIcon: {
    position: "absolute",
    top: -64,
    right: 0,
    opacity: 0.04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "150px",
  },
  grid: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

function FicheFournisseur(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const fournisseur = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur
  );
  const data = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.data
  );
  const loading = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.loading
  );
  const params = props.match.params;
  const { id, tab, slug } = params;

  useEffect(() => {
    if (tab === "produits") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [tab, setValue]);

  function handleChange(event, newValue) {
    if (newValue === 1) {
      props.history.push(`/entreprise/${id}-${slug}/produits`);
    }
    if (newValue === 0) {
      props.history.push(`/entreprise/${id}-${slug}`);
    }
    setValue(newValue);
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }
  if (fournisseur.data.length === 0 && !fournisseur.loading) {
    return (
      <div className="w-full max-w-2xl mx-auto   min-h-md">
        <Helmet>
          <title>Fournisseur inexistant</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex" />
        </Helmet>

        <Paper className="p-32 w-full my-6 text-center">
          <img
            className={classes.img}
            alt="product not found"
            src="assets/images/product_not_found.jpg"
          />
          <Typography variant="h6" className="mb-16 uppercase">
            Oups! Nous n'avons pas pu trouver cette entreprise
          </Typography>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => props.history.goBack()}
            className={clsx(classes.btn, "mr-8")}
          >
            <Icon>chevron_left</Icon>{" "}
            <span className="transition ease-in-out duration-700 ">Retour</span>
          </Button>
        </Paper>
      </div>
    );
  }
  if (!data) {
    return null;
  }

  return (
    <>
      {data && (
        <Helmet>
          <title>
            {_.truncate(data.societe + " | Les Achats Industriels", {
              length: 70,
              separator: " ",
            })}
          </title>
          <meta
            name="description"
            content={_.truncate(data.description, {
              length: 160,
              separator: " ",
            })}
          />
          <meta
            property="og:title"
            content={_.truncate(data.societe + " | Les Achats Industriels", {
              length: 70,
              separator: " ",
            })}
          />
          <meta
            property="og:description"
            content={_.truncate(data.description, {
              length: 160,
              separator: " ",
            })}
          />
          <meta
            property="twitter:title"
            content={_.truncate(data.societe + " | Les Achats Industriels", {
              length: 70,
              separator: " ",
            })}
          />
          <meta
            property="twitter:description"
            content={_.truncate(data.description, {
              length: 160,
              separator: " ",
            })}
          />
        </Helmet>
      )}
      {loading ? (
        ""
      ) : (
        <>
          <Grid
            container
            spacing={2}
            classes={{
              "spacing-xs-2": classes.grid,
            }}
            className={clsx(classes.fiche, " relative max-w-2xl mx-auto")}
          >
            <div className={classes.overlay} />

            <Grid
              container
              spacing={2}
              classes={{
                "spacing-xs-2": classes.grid,
              }}
              className="py-24 z-999 sm:px-16 items-start"
            >
              <Grid item xs={12} sm={2}>
                {data.avatar ? (
                  <div
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  >
                    <img
                      className={clsx(classes.img, "bg-white rounded-lg")}
                      alt={data.societe}
                      src={URL_SITE + data.avatar.url}
                    />
                  </div>
                ) : (
                  <Avatar
                    alt={data.societe}
                    className={clsx(
                      classes.bigAvatar,
                      "uppercase text-48 font-bold"
                    )}
                  >
                    {data.societe ? data.societe[0] + data.societe[1] : ""}
                  </Avatar>
                )}
              </Grid>
              <Grid item xs={12} sm={10}>
                <div className={clsx(classes.title, " ")}>
                  <Typography
                    variant="h1"
                    className={clsx(
                      classes.shadow,
                      "uppercase  text-28 font-bold text-white tracking-wide "
                    )}
                  >
                    {data.societe}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Icon className={classes.headerIcon}>school</Icon>
          </Grid>
          <Grid
            container
            spacing={2}
            classes={{
              "spacing-xs-2": classes.grid,
            }}
            className={clsx(
              classes.position,
              "max-w-2xl  z-999 mx-auto sm:px-16 items-start "
            )}
          >
            <Grid item xs={12} sm={7} md={8}>
              <Paper className={classes.root}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="off"
                  classes={{
                    root: "h-64 w-full border-b-1 z",
                  }}
                >
                  <Tab
                    classes={{
                      root: "h-64",
                    }}
                    label="INFOS ENTREPRISE"
                  />
                  <Tab
                    classes={{
                      root: "h-64",
                    }}
                    label="PRODUITS"
                  />
                </Tabs>
                {value === 0 && <InfoEntreprise {...props} />}
                {value === 1 && <Produits />}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5} md={4} className="sticky top-0">
              <Card className={clsx("", classes.root)}>
                <div className="p-20 bg-gray-400 uppercase relative text-center font-bold text-16 ">
                  Contactez l'entreprise
                  <Icon className={classes.businessIcon}>business</Icon>
                  <Icon className={classes.businessDownIcon}>
                    arrow_drop_down
                  </Icon>
                </div>
                <CardContent>
                  <Grid container spacing={2} className="items-center my-1">
                    <Grid item xs={4} sm={4}>
                      <Avatar
                        className={clsx(classes.avatar, "avatar text-40 ")}
                      >
                        <Icon className={classes.icon}>location_on</Icon>
                      </Avatar>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        className="uppercase font-bold"
                      >
                        {data.societe}
                      </Typography>
                      <Typography color="textSecondary">
                        {_.capitalize(data.adresse1)}
                      </Typography>
                      <Typography color="textSecondary">
                        {data.ville && _.capitalize(data.ville.name)}
                        {data.pays && ", " + _.capitalize(data.pays.name)}
                      </Typography>
                      <Typography color="textSecondary">
                        {data.ice && "ICE: " + data.ice}
                      </Typography>
                    </Grid>
                  </Grid>

                  {data.website && (
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={300}
                    >
                      <Button
                        variant="outlined"
                        className="whitespace-no-wrap lowercase items-center mb-8 mt-2 w-full"
                        color="primary"
                        href={data.website}
                        target="_blank"
                      >
                        <Icon className="no-underline mr-2">language</Icon>{" "}
                        <span> {data.website}</span>
                      </Button>
                    </FuseAnimate>
                  )}

                  {data.id && (
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={300}
                    >
                      <Button
                        size="large"
                        onClick={(ev) =>
                          dispatch(
                            Actions.openNewContactFournisseurDialog(data.id)
                          )
                        }
                        className="whitespace-no-wrap upercase mb-8 mt-2 w-full items-center"
                        color="primary"
                        variant="contained"
                      >
                        <Icon className="mr-2">email</Icon>Envoyer un message
                      </Button>
                    </FuseAnimate>
                  )}

                  {fournisseur.loadingsPhone ? (
                    <Typography
                      variant="h6"
                      color="textPrimary"
                      className="uppercase font-bold w-full items-center flex justify-center"
                    >
                      <CircularProgress className={classes.progress} />
                    </Typography>
                  ) : fournisseur.showPhone ? (
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={300}
                    >
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        className="uppercase font-bold w-full items-center flex justify-center"
                      >
                        <Icon>phone</Icon> <span>{fournisseur.phone}</span>
                      </Typography>
                    </FuseAnimate>
                  ) : (
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={300}
                    >
                      <Button
                        size="large"
                        onClick={(ev) =>
                          dispatch(Actions.updateVuPhoneFournisseur(data.id))
                        }
                        // onClick={ev => dispatch(Actions.openNewVillesDialog())}
                        className="whitespace-no-wrap upercase w-full"
                        variant="outlined"
                      >
                        Afficher le téléphone
                      </Button>
                    </FuseAnimate>
                  )}

                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Input
                      id="url"
                      value={window.location.href}
                      endAdornment={
                        <InputAdornment position="end">
                          <CopyToClipboard
                            text={window.location.href}
                            onCopy={() =>
                              dispatch(
                                showMessage({
                                  message: "URL copiée avec succès",
                                  anchorOrigin: {
                                    vertical: "top", //top bottom
                                    horizontal: "right", //left center right
                                  },
                                  variant: "success",
                                })
                              )
                            }
                          >
                            <Tooltip
                              title="Copier l'URL dans le presse-papier"
                              placement="top"
                            >
                              <IconButton aria-label="copy" color="primary">
                                <Icon>file_copy</Icon>
                              </IconButton>
                            </Tooltip>
                          </CopyToClipboard>
                        </InputAdornment>
                      }
                      inputProps={{
                        "aria-label": "url",
                      }}
                      className="text-11 mt-16"
                      label="Copier l'url de votre société"
                      fullWidth
                    />
                  </FuseAnimate>

                  <div className="flex justify-end items-center mt-16">
                    <div className="mr-8 font-bold">Partager sur :</div>
                    <div>
                      <InlineShareButtons
                        config={{
                          alignment: "center", // alignment of buttons (left, center, right)
                          color: "social", // set the color of buttons (social, white)
                          enabled: true, // show/hide buttons (true, false)
                          font_size: 16, // font size for the buttons
                          labels: "null", // button labels (cta, counts, null)
                          language: "fr", // which language to use (see LANGUAGES)
                          networks: [
                            // which networks to include (see SHARING NETWORKS)
                            "linkedin",
                            "twitter",
                            "email",
                            "facebook",
                            "messenger",
                            "whatsapp",
                          ],
                          padding: 8, // padding within buttons (INTEGER)
                          radius: 4, // the corner radius on each button (INTEGER)
                          show_total: false,
                          size: 30, // the size of each button (INTEGER)

                          // OPTIONAL PARAMETERS
                          url: window.location.href, // (defaults to current url)
                          image: data.avatar && URL_SITE + data.avatar.url, // (defaults to og:image or twitter:image)
                          description: data.description, // (defaults to og:description or twitter:description)
                          title: `${data.societe} | Les Achats Industriels`, // (defaults to og:title or twitter:title)
                          //message: 'custom email text',     // (only for email sharing)
                          //subject: 'custom email subject',  // (only for email sharing)
                          //username: 'custom twitter handle' // (only for twitter sharing)
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default React.memo(FicheFournisseur);
