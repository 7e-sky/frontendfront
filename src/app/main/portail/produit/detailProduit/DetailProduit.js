import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CircularProgress,
  CardContent,
  Typography,
  Icon,
  Avatar,
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import YouTube from "react-youtube";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import Produit from "../../index/Produit";
import * as Actions from "../store/actions";
import { Helmet } from "react-helmet";
import { InlineShareButtons } from "sharethis-reactjs";
import _ from "@lodash";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { URL_SITE } from "@fuse/Constants";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <IconButton
      aria-label="Next"
      style={{
        ...style,
        display: "block",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #bfbfbf",
        color: "#4a4a4a",
        right: "-25px",
        position: "absolute",
        top: "50%",
      }}
      onClick={onClick}
    >
      <Icon fontSize="small">arrow_forward_ios</Icon>
    </IconButton>
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <IconButton
      aria-label="Previous"
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #bfbfbf",
        color: "#4a4a4a",
        left: "-25px",
        position: "absolute",
        top: "50%",
      }}
      onClick={onClick}
    >
      <Icon fontSize="small">arrow_back_ios</Icon>
    </IconButton>
  );
}
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    position: "absolute",
    fontSize: 6,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  popper: arrowGenerator(theme.palette.common.black),
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
  tooltipPlacementLeft: {
    margin: "0 8px",
  },
  tooltipPlacementRight: {
    margin: "0 8px",
  },
  tooltipPlacementTop: {
    margin: "8px 0",
  },
  tooltipPlacementBottom: {
    margin: "8px 0",
  },
}));
function BootstrapTooltip(props) {
  const { arrow, ...classes } = useStylesBootstrap();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
}
BootstrapTooltip.propTypes = {
  title: PropTypes.node,
};
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  img: {
    width: "70%",
  },
  progress: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  price: {
    fontSize: 15,
    position: "relative",
    paddingRight: 20,
  },
  ht: {
    position: "absolute",
    top: 0,
    fontSize: 11,
    right: 0,
    color: "black",
  },
  pos: {
    marginBottom: 12,
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
  avatar: {
    width: 80,
    height: 80,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: "content-box",
    "& > img": {
      borderRadius: "50%",
      border: "10px solid #cbd5e0",
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  avatar2: {
    width: 80,
    height: 80,
    padding: 8,
    boxSizing: "content-box",
  },
  vendeur: {
    "&:hover": {
      "& H6": {
        color: "#55c39e",
      },
      "& img": {
        border: "10px solid #55c39e",
      },
    },
  },
  grid: {
    marginBottom: "-16px",
    marginTop: "-16px",
    marginLeft: "auto",
    marginRight: "auto",
    "& > .MuiGrid-item": {
      padding: "16px",
    },
  },
}));

function DetailProduit(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const produit = useSelector(({ produitsApp }) => produitsApp.detailProduit);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const opts = {
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      showinfo: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };
  const settings = {
    speed: 500,
    slidesToScroll:
      produit.produitsSimilaires && produit.produitsSimilaires.length < 4
        ? produit.produitsSimilaires.length
        : 4,
    slidesToShow:
      produit.produitsSimilaires && produit.produitsSimilaires.length < 4
        ? produit.produitsSimilaires.length
        : 4,
    dots: false,
    infinite:
      produit.produitsSimilaires && produit.produitsSimilaires.length > 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          className: "slick-slider-m m-auto",
          arrows: false,
        },
      },
    ],
  };
  const settings2 = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={
              produit.data.images && produit.data.images.length > 0
                ? URL_SITE + produit.data.images[i].url
                : `assets/images/ecommerce/product-placeholder.jpg`
            }
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    if (produit.data) {
      if (produit.data.images) {
        setImages(produit.data.images.map((item) => URL_SITE + item.url));
      }
    }
  }, [produit.data]);

  if (produit.data.length === 0 && !produit.loading) {
    return (
      <div className="w-full max-w-2xl mx-auto   min-h-md">
        <Helmet>
          <title>Produit inexistant</title>
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
            Oups! Nous n'avons pas pu trouver ce produit
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

  function hadnleDownload(fiche) {
    dispatch(Actions.getFile(fiche));
  }

  return (
    <>
      {produit.data && (
        <Helmet>
          <title>
            {_.truncate(
              produit.data.titre +
                " | " +
                (produit.data.fournisseur && produit.data.fournisseur.societe),
              { length: 70, separator: " " }
            )}
          </title>
          <meta
            name="description"
            content={_.truncate(produit.data.description, {
              length: 160,
              separator: " ",
            })}
          />
          <meta
            property="og:title"
            content={_.truncate(
              produit.data.titre +
                " | " +
                (produit.data.fournisseur && produit.data.fournisseur.societe),
              { length: 70, separator: " " }
            )}
          />
          <meta
            property="og:description"
            content={_.truncate(produit.data.description, {
              length: 160,
              separator: " ",
            })}
          />
          <meta
            property="twitter:title"
            content={_.truncate(
              produit.data.titre +
                " | " +
                (produit.data.fournisseur && produit.data.fournisseur.societe),
              { length: 70, separator: " " }
            )}
          />
          <meta
            property="twitter:description"
            content={_.truncate(produit.data.description, {
              length: 160,
              separator: " ",
            })}
          />
          {produit.data.featuredImageId && (
            <meta
              property="og:image"
              content={URL_SITE + produit.data.featuredImageId.url}
            />
          )}
        </Helmet>
      )}
      <Grid
        container
        className={clsx(
          classes.grid,
          "max-w-2xl mx-auto py-48 sm:px-16 items-start"
        )}
      >
        {produit.loading ? (
          <Grid item xs={12} sm={12}>
            <ContentLoader
              speed={2}
              width={480}
              height={400}
              viewBox="0 0 480 400"
            >
              <rect x="5" y="5" rx="3" ry="3" width="121" height="13" />
              <rect x="219" y="7" rx="3" ry="3" width="85" height="8" />
              <rect x="6" y="27" rx="3" ry="3" width="297" height="160" />
              <rect x="92" y="199" rx="0" ry="0" width="22" height="19" />
              <rect x="122" y="199" rx="0" ry="0" width="22" height="19" />
              <rect x="153" y="199" rx="0" ry="0" width="22" height="19" />
              <rect x="181" y="199" rx="0" ry="0" width="22" height="19" />
              <rect x="4" y="228" rx="3" ry="3" width="299" height="18" />
              <rect x="3" y="255" rx="3" ry="3" width="299" height="82" />
              <rect x="354" y="4" rx="3" ry="3" width="121" height="20" />
              <circle cx="373" cy="51" r="20" />
              <rect x="398" y="35" rx="3" ry="3" width="69" height="13" />
              <rect x="399" y="57" rx="3" ry="3" width="69" height="7" />
              <rect x="362" y="79" rx="3" ry="3" width="102" height="23" />
              <rect x="362" y="109" rx="3" ry="3" width="102" height="23" />
            </ContentLoader>
          </Grid>
        ) : (
          produit.data && (
            <>
              <Grid item xs={12} sm={8}>
                <Card className={classes.root}>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <Typography
                          className={classes.title}
                          component="h1"
                          color="primary"
                        >
                          {produit.data.titre}
                        </Typography>
                        <Typography color="textSecondary">
                          {produit.data.reference &&
                            "Réf." + produit.data.reference}
                        </Typography>
                      </div>
                      <Typography
                        className={classes.price}
                        className="uppercase"
                        color="secondary"
                      >
                        {produit.data.pu
                          ? parseFloat(produit.data.pu).toLocaleString(
                              "fr", // leave undefined to use the browser's locale,
                              // or use a string like 'en-US' to override it.
                              { minimumFractionDigits: 2 }
                            ) +
                            (produit.data.currency &&
                              " " + produit.data.currency.name) +
                            " HT"
                          : "Prix sur demande"}
                      </Typography>
                    </div>
                    <div className="p-28">
                      <Slider {...settings2}>
                        {produit.data.images &&
                        produit.data.images.length > 0 ? (
                          produit.data.images.map((item, index) => (
                            <div key={index} className="flex items-center ">
                              <img
                                src={URL_SITE + item.url}
                                style={{ cursor: "pointer" }}
                                alt={produit.data.titre}
                                className="m-auto"
                                onClick={() => {
                                  setIsOpen(true);
                                  setPhotoIndex(index);
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="justify-center">
                            <img
                              src="assets/images/ecommerce/product-placeholder.jpg"
                              alt="Product not found img"
                            />
                          </div>
                        )}
                      </Slider>
                    </div>
                    <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16">
                      Description
                    </div>

                    <Typography component="p" className="whitespace-pre-line">
                      {produit.data.description}
                    </Typography>
                    {produit.data.videos ? (
                      <>
                        <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16">
                          Vidéo
                        </div>
                        <YouTube videoId={produit.data.videos} opts={opts} />
                      </>
                    ) : (
                      ""
                    )}
                    {produit.data.ficheTechnique ? (
                      <>
                        <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16 ">
                          Fiche technique
                        </div>
                        <Chip
                          icon={<Icon className="text-16 mr-0">save_alt</Icon>}
                          onClick={() => {
                            hadnleDownload(produit.data.ficheTechnique);
                          }}
                          label="Télécharger"
                          classes={{
                            root: clsx("h-24", props.className),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                            ...props.classes,
                          }}
                          variant="outlined"
                          className="mr-4 cursor-pointer"
                        />
                      </>
                    ) : (
                      ""
                    )}

                    <br />
                    <br />
                    <br />
                    <Divider className="mb-6" />
                    <Chip
                      icon={<Icon className="text-16 mr-0">label</Icon>}
                      component={Link}
                      to={
                        "/vente-produits/" +
                        (produit.data.secteur && produit.data.secteur.slug) +
                        "/" +
                        (produit.data.sousSecteurs &&
                          produit.data.sousSecteurs.slug)
                      }
                      label={
                        produit.data.sousSecteurs
                          ? produit.data.sousSecteurs.name
                          : ""
                      }
                      classes={{
                        root: clsx("h-24", props.className),
                        label: "pl-4 pr-6 py-4 text-11",
                        deleteIcon: "w-16 ml-0",
                        ...props.classes,
                      }}
                      variant="outlined"
                      className="mr-4 cursor-pointer"
                    />

                    <Chip
                      icon={<Icon className="text-16 mr-0">label</Icon>}
                      component={Link}
                      to={
                        "/vente-produits/" +
                        (produit.data.secteur && produit.data.secteur.slug) +
                        "/" +
                        (produit.data.sousSecteurs &&
                          produit.data.sousSecteurs.slug) +
                        "/" +
                        (produit.data.categorie && produit.data.categorie.slug)
                      }
                      label={
                        produit.data.categorie
                          ? produit.data.categorie.name
                          : ""
                      }
                      classes={{
                        root: clsx("h-24", props.className),
                        label: "pl-4 pr-6 py-4 text-11",
                        deleteIcon: "w-16 ml-0",
                        ...props.classes,
                      }}
                      variant="outlined"
                      className="mr-4 cursor-pointer"
                    />

                    <Divider className="mt-6" />
                  </CardContent>
                </Card>
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
                          "facebook",
                          "twitter",
                          "email",
                          "messenger",
                          "whatsapp",
                        ],
                        padding: 8, // padding within buttons (INTEGER)
                        radius: 4, // the corner radius on each button (INTEGER)
                        show_total: false,
                        size: 30, // the size of each button (INTEGER)

                        // OPTIONAL PARAMETERS
                        // url: 'https://www.sharethis.com', // (defaults to current url)
                        image:
                          produit.data.featuredImageId &&
                          URL_SITE + produit.data.featuredImageId.url, // (defaults to og:image or twitter:image)
                        description: produit.data.description, // (defaults to og:description or twitter:description)
                        title: `${produit.data.titre} | Les Achats Industriels`, // (defaults to og:title or twitter:title)
                        quote: produit.data.titre,

                        //message: 'custom email text',     // (only for email sharing)
                        //subject: 'custom email subject',  // (only for email sharing)
                        //username: 'custom twitter handle' // (only for twitter sharing)
                      }}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} className="sticky top-0">
                <Card className={clsx("", classes.root)}>
                  <div className="p-20 bg-gray-400 uppercase relative text-center font-bold text-16 ">
                    Mini-site
                    <Icon className={classes.businessIcon}>business</Icon>
                    <Icon className={classes.businessDownIcon}>
                      arrow_drop_down
                    </Icon>
                  </div>
                  <CardContent>
                    <BootstrapTooltip
                      placement="top"
                      title="Voir la page entreprise"
                    >
                      <Grid
                        container
                        spacing={2}
                        component={Link}
                        to={
                          produit.data.fournisseur &&
                          (produit.data.fournisseur.parent
                            ? `/entreprise/${produit.data.fournisseur.parent.id}-${produit.data.fournisseur.parent.slug}`
                            : `/entreprise/${produit.data.fournisseur.id}-${produit.data.fournisseur.slug}`)
                        }
                        className={clsx(classes.vendeur, "items-center my-1")}
                      >
                        <Grid item xs={4} sm={4}>
                          {produit.data.fournisseur &&
                          produit.data.fournisseur.avatar ? (
                            <Avatar
                              className={clsx(classes.avatar, "avatar")}
                              alt={produit.data.fournisseur.societe}
                              src={
                                URL_SITE + produit.data.fournisseur.avatar.url
                              }
                            />
                          ) : (
                            <Avatar
                              className={clsx(
                                classes.avatar2,
                                "avatar text-40 "
                              )}
                            >
                              <Icon>business</Icon>
                            </Avatar>
                          )}
                        </Grid>
                        <Grid item xs={8} sm={8}>
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            className="uppercase font-bold"
                          >
                            {produit.data.fournisseur
                              ? produit.data.fournisseur.societe
                              : ""}
                          </Typography>
                          <Typography color="textSecondary">
                            {produit.data.fournisseur &&
                            produit.data.fournisseur.ville
                              ? produit.data.fournisseur.ville.name + ", "
                              : ""}
                            {produit.data.fournisseur &&
                            produit.data.fournisseur.pays
                              ? produit.data.fournisseur.pays.name
                              : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </BootstrapTooltip>
                    {produit.data["@id"] && (
                      <FuseAnimate
                        animation="transition.slideRightIn"
                        delay={300}
                      >
                        <Button
                          size="large"
                          onClick={(ev) =>
                            dispatch(
                              Actions.openNewDemandeDevisDialog(
                                produit.data["@id"]
                              )
                            )
                          }
                          className="whitespace-no-wrap upercase mb-8 mt-2 w-full"
                          color="primary"
                          variant="contained"
                        >
                          Demandez un devis
                        </Button>
                      </FuseAnimate>
                    )}
                    {produit.loadingsPhone ? (
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        className="uppercase font-bold w-full items-center flex justify-center"
                      >
                        <CircularProgress className={classes.progress} />
                      </Typography>
                    ) : produit.showPhone ? (
                      <FuseAnimate
                        animation="transition.slideRightIn"
                        delay={300}
                      >
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          className="uppercase font-bold w-full items-center flex justify-center"
                        >
                          <Icon>phone</Icon> <span>{produit.phone}</span>
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
                            dispatch(
                              Actions.updateVuPhoneProduit(produit.data.id)
                            )
                          }
                          // onClick={ev => dispatch(Actions.openNewVillesDialog())}
                          className="whitespace-no-wrap upercase w-full"
                          variant="outlined"
                        >
                          Affichez le téléphone
                        </Button>
                      </FuseAnimate>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                  }
                />
              )}
            </>
          )
        )}
      </Grid>
      <Grid container className="max-w-2xl mx-auto pb-48">
        <Grid item sm={12}>
          {produit.loadingPS ? (
            <ContentLoader
              viewBox="0 0 1360 400"
              height={400}
              width={1360}
              speed={2}
            >
              <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
              <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
              <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
              <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
              <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
              <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
              <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
              <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
            </ContentLoader>
          ) : (
            produit.produitsSimilaires.length > 1 && (
              <div>
                <ListItem className="mb-16">
                  <ListItemAvatar>
                    <Avatar className={classes.mainAvatar}>
                      <Icon>collections_bookmark</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h2"
                        component="h2"
                        className="text-20 uppercase font-bold xs:text-11 mb-1"
                      >
                        Produits similaires
                      </Typography>
                    }
                  />
                </ListItem>
                <Slider {...settings}>
                  {produit.produitsSimilaires.map(
                    (item, index) =>
                      item["@id"] !== produit.data["@id"] && (
                        <Produit produit={item} key={index} />
                      )
                  )}
                </Slider>
              </div>
            )
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(DetailProduit);
