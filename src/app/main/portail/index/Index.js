import React, { useEffect } from "react";
import {
  Icon,
  Typography,
  List,
  Grid,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import { Link } from "react-router-dom";
import DemandeAchatsListItem from "./DemandeAchatsListItem";
import Newsletter from "./Newsletter";
import BioAcheteur from "./BioAcheteur";
import BioFournisseur from "./BioFournisseur";
import News from "./News";
import Produit from "./Produit";
import Slider from "react-slick";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import YouTube from "react-youtube";
import ContentLoader from "react-content-loader";
import Search from "../Search/Search";
import { Helmet } from "react-helmet";
import Navigation from "../categories/Navigation";
import Link2 from "@material-ui/core/Link";
import Categories from "./Categories";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight      : '100%',
    position: "relative",
    flex: "1 0 auto",
    height: "auto",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    listStyleType: "none",
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    position: "relative",
    //marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://source.unsplash.com/collection/9456871/1600x900)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  middle: {
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    position: "relative",
    marginBottom: theme.spacing(4),
  },
  headerIcon: {
    position: "absolute",
    top: -64,
    left: 0,
    opacity: 0.04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    borderRadius: 10,
  },
  mainHeader: {
    backgroundColor: "rgba(0,0,0,.7)",
  },
  icon: {
    color: theme.palette.secondary.dark,
    padding: theme.spacing(0.5, 0, 0, 0),
    fontSize: 34,
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },

  mainAvatar: {
    margin: theme.spacing(1.25, 1.25, 1.25, 0),
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    margin: 5,
  },
  media: {
    height: 140,
  },
  buttonXs: {
    [theme.breakpoints.down("xs")]: {
      margin: "11px 0",
      position: "static",
      textAlign: "end",
    },
  },
  buttonSm: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 11,
      position: "static",
      textAlign: "end",
    },
  },
  bioFournisseur: {
    paddingRight: 16,
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
    },
  },
  bioAchteur: {
    paddingLeft: 16,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  bannerLeadeboard: {
    width: "80%",
    height: "100%",
    margin: "auto",
  },
  bannerMeduim: {
    height: 250,
    width: 300,
    margin: "auto",
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function Index(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const title = "Les Achats Industriels | Place de marché B2B";
  const description =
    "Les Achats Industriels Site marchand et la place de marché b2b spécialisé dans le E-sourcing, E business, E marketing, Recherche de Fournisseur Acheteur ,Recever meilleure offre de prix,Site de vente en ligne, Boutique e commerce, Nouveaux clients, E marchands, Vente à distance, Logistique e commerce,E merchandising, Vente sur internet, Salon e commerce, Stratégie marketing, Solution e commerce";
  const portail = useSelector(({ IndexApp }) => IndexApp.poratilIndex);
  const settings = {
    speed: 500,
    slidesToScroll:
      portail.produits && portail.produits.length < 4
        ? portail.produits.length
        : 4,
    slidesToShow:
      portail.produits && portail.produits.length < 4
        ? portail.produits.length
        : 4,
    dots: false,
    infinite: portail.produits && portail.produits.length > 3,
    autoplay: true,
    autoplaySpeed: 5000,
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
          className: "slick-slider-m mb-16",
          arrows: false,
        },
      },
    ],
  };
  const opts = {
    width: "100%",
    height: "200px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      showinfo: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  useEffect(() => {
    dispatch(Actions.getCategories());
    return () => {
      dispatch(Actions.cleanUpCategories());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getFocusProduct());
    return () => {
      dispatch(Actions.cleanUpProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getdemandeDevis());
    return () => {
      dispatch(Actions.cleanUpDevis());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getNews());
    return () => {
      dispatch(Actions.cleanUpNew());
    };
  }, [dispatch]);

  return (
    <div
      className={clsx(
        classes.root,
        props.innerScroll && classes.innerScroll,
        "min-h-md"
      )}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {/** 
             ===================HEADER=================
            **/}
      <div
        className={clsx(
          classes.header,
          "relative flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-256 sm:h-288"
        )}
      >
        <div
          className={clsx(
            classes.mainHeader,
            "items-center md:w-xl xs:w-auto z-999 px-8 py-20 rounded-lg"
          )}
        >
          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="h1"
              component="h1"
              className="sm:text-18 uppercase leading-normal text-13 font-bold mb-16 text-white mx-auto max-w-xl"
            >
              Les Achats Industriels, c'est la communauté de +1000 sociétés,
              Acheteurs et Fournisseurs
            </Typography>
          </FuseAnimate>
          <div className="md:w-md xs:w-auto m-auto bg-white rounded-8">
            <Search className="" variant="basic" />
          </div>
        </div>
      </div>

      {/**===================CATEGORIES & RFQs=================**/}
      <Categories categories={portail.categories} />

      <Grid container className=" max-w-2xl mx-auto px-8 sm:px-16 py-24">
        <Grid item sm={8} xs={12}>
          <div className={classes.demo}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.mainAvatar}>
                  <Icon>featured_play_list</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h2"
                    component="h2"
                    className="text-20 font-bold xs:text-11 mb-1"
                  >
                    DERNIÈRES DEMANDES DE DEVIS
                  </Typography>
                }
              />
            </ListItem>

            <List className="p-0 w-full">
              {portail.loading ? (
                generate(
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={60}
                    viewBox="0 0 400 100"
                  >
                    <rect x="1" y="2" rx="3" ry="3" width="54" height="6" />
                    <rect x="1" y="20" rx="3" ry="3" width="200" height="6" />
                    <rect x="1" y="35" rx="9" ry="9" width="79" height="15" />
                    <rect x="88" y="35" rx="9" ry="9" width="79" height="15" />
                    <circle cx="373" cy="21" r="11" />
                    <rect x="1" y="57" rx="0" ry="0" width="390" height="2" />
                  </ContentLoader>
                )
              ) : (
                <FuseAnimateGroup
                  enter={{
                    animation: "transition.slideUpBigIn",
                  }}
                >
                  {portail.data &&
                    portail.data.map((item, index) => (
                      <DemandeAchatsListItem demande={item} key={index} />
                    ))}
                </FuseAnimateGroup>
              )}
            </List>

            {portail.data && (
              <div className="px-16 py-16 text-right">
                <Link2 component={Link} to={`/demandes-achats`}>
                  Toutes les demandes de devis &rarr;
                </Link2>
              </div>
            )}
          </div>
        </Grid>
        <Grid item sm={4} xs={12} className="flex flex-col justify-between  ">
          <div
            className={clsx(
              classes.bannerMeduim,
              "flex flex-wrap content-center"
            )}
          >
            <div className="text-center font-bold ">
              <a
                href="https://www.3findustrie.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/banner2.jpeg"
                  alt="3fi banner 2"
                />
              </a>
            </div>
          </div>
          <div
            className={clsx(
              classes.bannerMeduim,
              "flex flex-wrap content-center"
            )}
          >
            <div className="text-center font-bold">
              <a
                href="https://www.3findustrie.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/banner3.png"
                  alt="3fi banner 2"
                />
              </a>
            </div>
          </div>
        </Grid>
      </Grid>

      {/** 
             ===================FOCUS PORDUCTS=================
            **/}
      <Grid container className="max-w-2xl mx-auto mb-16 px-8 sm:px-16 py-24">
        <Grid item sm={12}>
          <div>
            <ListItem
              classes={{
                container: classes.container,
              }}
            >
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
                    className="text-20 font-bold xs:text-11 mb-1"
                  >
                    FOCUS PRODUITS
                  </Typography>
                }
                secondary="Un extrait des catalogues B2B des fournisseurs et fabricants présents sur Les Achats Industriels."
              />
              <ListItemSecondaryAction
                classes={{
                  root: classes.buttonSm,
                }}
              >
                <Button
                  component={Link}
                  to="/vente-produits"
                  className="whitespace-no-wrap"
                  color="secondary"
                  variant="outlined"
                >
                  Plus de produits
                  <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            {portail.loadingProduits ? (
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
              <Slider {...settings}>
                {portail.produits &&
                  portail.produits.map((item, index) => (
                    <Produit produit={item.produit} key={index} />
                  ))}
              </Slider>
            )}
          </div>
        </Grid>
      </Grid>

      <div
        className={clsx(
          classes.bannerLeadeboard,
          "flex flex-wrap content-center"
        )}
      >
        <a
          href="https://www.preventica-africa.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className=""
            src="assets/images/banners/banniere_preventica.jpg"
            alt="preventica banner"
          />
        </a>
      </div>
      {/*===================DECOUVREZ LES SHA=================**/}
      <div
        className={clsx(
          classes.middle,
          "relative hidden overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-512 sm:h-288 "
        )}
      >
        <div className={classes.overlay} />
        <Grid
          container
          className="max-w-2xl mx-auto px-8 sm:px-16 items-center py-24 z-9999"
        >
          <Grid item sm={7} xs={12}>
            <Typography
              variant="h2"
              component="h2"
              className="text-white text-24 uppercase mb-16"
            >
              Découvrez le service{" "}
              <span className="font-extrabold">Les Achats Industriels</span>
            </Typography>
            <Typography className="text-white opacity-75">
              La place de marché N°1 au Maroc, qui permet aux Acheteurs et aux
              Fournisseurs de se rencontrer dans une même plate-forme
              (électronique).
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <YouTube videoId="rv2v5pNCQb4" opts={opts} />
          </Grid>
        </Grid>

        <Icon className={classes.headerIcon}>school</Icon>
      </div>

      {/** 
             ===================INSCRIPTION FOURNISSEUR=================
            **/}
      <Grid container className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
        <Grid item sm={6} xs={12} className={classes.bioFournisseur}>
          <BioFournisseur />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.bioAchteur}>
          <BioAcheteur />
        </Grid>
      </Grid>

      {/** 
             ===================NEWS=================
            **/}
      <Grid container className="max-w-2xl mx-auto px-8 mb-16 sm:px-16 py-24">
        <Grid item sm={12}>
          <div>
            <ListItem
              classes={{
                container: classes.container,
              }}
            >
              <ListItemAvatar>
                <Avatar className={classes.mainAvatar}>
                  <Icon>local_library</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h2"
                    component="h2"
                    className="text-20 font-bold uppercase xs:text-11 mb-1"
                  >
                    LES DERNIERS ARTICLES DE NEWS
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                classes={{
                  root: classes.buttonXs,
                }}
              >
                <Button
                  component={Link}
                  to="/actualites"
                  className="whitespace-no-wrap"
                  color="secondary"
                  variant="outlined"
                >
                  Toute l'actualité
                  <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container spacing={2} className="justify-center">
              {portail.loadingNews
                ? generate(
                    <Grid item sm={3}>
                      <ContentLoader
                        speed={2}
                        width={119}
                        height={100}
                        viewBox="0 0 119 100"
                      >
                        <rect
                          x="4"
                          y="7"
                          rx="0"
                          ry="0"
                          width="125"
                          height="77"
                        />
                        <rect
                          x="7"
                          y="95"
                          rx="3"
                          ry="3"
                          width="85"
                          height="7"
                        />
                      </ContentLoader>
                    </Grid>
                  )
                : portail.news &&
                  portail.news.map((item, index) => (
                    <Grid item sm={3} key={index}>
                      <News news={item} />
                    </Grid>
                  ))}
            </Grid>
          </div>
        </Grid>
      </Grid>

      {/** 
             ===================NEWSLETTER=================
            **/}
      <div
        className={clsx(
          classes.middle,
          "mb-0 relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-300 sm:h-96 "
        )}
      >
        <div className={classes.overlay} />
        <Grid
          container
          className="max-w-2xl mx-auto px-8  sm:px-16 items-center z-9999"
        >
          <Grid item sm={7} xs={12}>
            <Typography
              variant="h2"
              component="h2"
              className="text-white text-24 uppercase mb-2"
            >
              Newsletters{" "}
              <span className="font-extrabold"> Les Achats Industriels</span>
            </Typography>
            <Typography className="text-white opacity-75">
              Inscrivez-vous pour recevoir les newsletters dans votre boîte
              mail.
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Newsletter />
            </FuseAnimate>
          </Grid>
        </Grid>

        <Icon className={classes.headerIcon}>school</Icon>
      </div>
    </div>
  );
}
export default withReducer("IndexApp", reducer)(Index);
