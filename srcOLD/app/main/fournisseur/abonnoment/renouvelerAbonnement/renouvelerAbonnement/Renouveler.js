import React, { useEffect, useState } from "react";
import {
  Button,
  Icon,
  Typography,
  LinearProgress,
  Grid,
  Tabs,
  Tab,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Divider,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import {
  FuseAnimate,
  FusePageCarded,
  SelectReactFormsy,
  LOCAL_CURRENCY,
  LOCAL_TVA,
} from "@fuse";
import { Link } from "react-router-dom";
import Link2 from "@material-ui/core/Link";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import Formsy from "formsy-react";
import { useForm } from "@fuse/hooks";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import ContentLoader from "react-content-loader";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chips: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  renouvelerImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: red[400],
    opacity: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  renouvelerImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  border: {
    borderLeft: "11px solid " + theme.palette.secondary.main + "!important",
    paddingLeft: 11,
  },
  renouvelerImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $renouvelerImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $renouvelerImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $renouvelerImageFeaturedStar": {
        opacity: 1,
      },
    },
  },

  error: {
    backgroundColor: theme.palette.error.dark,
  },

  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },

  chip: {
    marginLeft: theme.spacing(1),
    background: "#ef5350",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
  },
  chip2: {
    marginLeft: theme.spacing(1),
    background: "#4caf50",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
  },
  chip3: {
    margin: theme.spacing(1),
    background: "green",
    color: "white",
    fontWeight: "bold",
    fontSize: "11px",
  },
}));

function Renouveler(props) {
  const dispatch = useDispatch();
  const renouveler = useSelector(
    ({ renouvelerOffreFrsApp }) => renouvelerOffreFrsApp.commande
  );

  const user = useSelector(({ auth }) => auth.user);

  const [sousSecteurs, setSousSecteurs] = useState([]);
  const [sousSecteur, setSousSecteur] = useState("");
  const [secteur, setSecteur] = useState("");
  const [secteur1, setSecteur1] = useState(null);
  const [offre, setOffre] = useState(null);
  const [mode, setMode] = useState(null);
  const [duree, setDuree] = useState(null);
  const [open, setOpen] = useState(false);
  const { form, setForm } = useForm(null);
  const [prixht, setPrixht] = useState(0);
  const [tva, setTva] = useState(0);
  const [remise, setRemise] = useState(0);
  const [prixhtNet, setPrixhtNet] = useState(0);
  const [prixTTC, setPrixTTC] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getOffres());
    dispatch(Actions.getFournisseurSousSecteurs(user.id));
    //dispatch(Actions.getSousSecteurs());
    dispatch(Actions.getSecteurs());
    dispatch(Actions.getPaiements());
    dispatch(Actions.getDurees());
  }, [dispatch, user.id]);

  // Effect redirection and clean state
  useEffect(() => {
    if (renouveler.successActivite) {
      setOpen(false);
    }
  }, [renouveler.successActivite, setOpen]);

  // New Or update form
  useEffect(() => {
    function updateRenouvelerState() {
      const params = props.match.params;
      const { commandeId } = params;
      dispatch(Actions.getCommande(commandeId));
    }
    updateRenouvelerState();
    return () => {
      dispatch(Actions.cleanUp());
    };
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (renouveler.data && !form) ||
      (renouveler.data && form && renouveler.data.id !== form.id)
    ) {
      setForm({ ...renouveler.data });
      if (renouveler.data.sousSecteurs) {
        setSousSecteurs(
          renouveler.data.sousSecteurs.map((item) => ({
            value: item["@id"],
            label: item.secteur.name + ": " + item.name,
          }))
        );
      }
      if (renouveler.data.offre) setOffre(renouveler.data.offre);
      if (renouveler.data.mode) setMode(renouveler.data.mode["@id"]);
      if (renouveler.data.duree) {
        setDuree(renouveler.data.duree);
        if (renouveler.data.offre) {
          if (renouveler.data.fournisseur.currency.name === LOCAL_CURRENCY) {
            let ht = renouveler.data.offre.prixMad * renouveler.data.duree.name;

            setPrixht(ht);

            if (renouveler.data.duree.remise) {
              let remis = (ht * renouveler.data.duree.remise) / 100;
              let netHt = ht - remis;
              let tva = netHt * LOCAL_TVA;
              setRemise(remis);
              setPrixhtNet(netHt);
              setTva(tva);
              setPrixTTC(netHt + tva);
            } else {
              let tva = ht * LOCAL_TVA;
              setTva(ht * LOCAL_TVA);
              setPrixTTC(ht + tva);
            }
          } else {
            let ht = renouveler.data.offre.prixEur * renouveler.data.duree.name;
            setPrixht(ht);
            if (renouveler.data.duree.remise) {
              let remis = (ht * renouveler.data.duree.remise) / 100;
              let netHt = ht - remis;
              //let tva = netHt * LOCAL_TVA;
              setRemise(remis);
              setPrixhtNet(netHt);
              //setTva(tva)
              //setPrixTTC(netHt + tva)
              setPrixTTC(netHt);
            } else {
              //let tva = ht * LOCAL_TVA;
              //setTva(ht * LOCAL_TVA)
              //setPrixTTC(ht + tva)
              setPrixTTC(ht);
            }
          }
        }
      }
    }
  }, [form, renouveler.data, setForm]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleChangeDuree(item) {
    setDuree(item);
    if (user.data.currency === LOCAL_CURRENCY) {
      let ht = offre.prixMad * item.name;
      setPrixht(ht);

      if (item.remise) {
        let remis = (ht * item.remise) / 100;
        let netHt = ht - remis;
        let tva = netHt * LOCAL_TVA;
        setRemise(remis);
        setPrixhtNet(netHt);
        setTva(tva);
        setPrixTTC(netHt + tva);
      } else {
        let netHt = ht;
        let tva = netHt * LOCAL_TVA;
        setTva(tva);
        setPrixhtNet(netHt);
        setPrixTTC(netHt + tva);
      }
    } else {
      let ht = offre.prixEur * item.name;
      setPrixht(ht);

      if (item.remise) {
        let remis = (ht * item.remise) / 100;
        let netHt = ht - remis;
        // let tva = netHt * LOCAL_TVA;

        setRemise(remis);
        setPrixhtNet(netHt);
        //setTva(tva)
        //setPrixTTC(netHt + tva)
        setPrixTTC(netHt);
      } else {
        let netHt = ht;
        //let tva = netHt * LOCAL_TVA;
        //setTva(tva)
        setPrixhtNet(netHt);
        //setPrixTTC(netHt + tva)
        setPrixTTC(netHt);
      }
    }
  }

  function handleChangeOffre(item) {
    setOffre(item);
    if (sousSecteurs.length > 0) {
      setSousSecteurs(_.slice(sousSecteurs, 0, item.nbActivite));
    }

    if (user.data.currency === LOCAL_CURRENCY) {
      let ht = item.prixMad * duree.name;
      setPrixht(ht);

      if (duree.remise) {
        let remis = (ht * duree.remise) / 100;
        let netHt = ht - remis;
        let tva = netHt * LOCAL_TVA;
        setRemise(remis);
        setPrixhtNet(netHt);
        setTva(tva);
        setPrixTTC(netHt + tva);
      } else {
        let netHt = ht;
        let tva = netHt * LOCAL_TVA;
        setTva(tva);
        setPrixhtNet(netHt);
        setPrixTTC(netHt + tva);
      }
    } else {
      let ht = item.prixEur * duree.name;
      setPrixht(ht);

      if (duree.remise) {
        let remis = (ht * duree.remise) / 100;
        let netHt = ht - remis;
        //let tva = netHt * LOCAL_TVA;

        setRemise(remis);
        setPrixhtNet(netHt);
        //setTva(tva)
        //setPrixTTC(netHt + tva)
        setPrixTTC(netHt);
      } else {
        let netHt = ht;
        //let tva = netHt * LOCAL_TVA;
        //setTva(tva)
        setPrixhtNet(netHt);
        //setPrixTTC(netHt + tva)
        setPrixTTC(netHt);
      }
    }
  }

  function handleSubmit() {
    dispatch(
      Actions.saveRenouvelement(sousSecteurs, offre, mode, duree, props.history)
    );
  }

  function handleSubmitActivites() {
    dispatch(Actions.AddSuggestionSecteur(secteur, sousSecteur, user.id));
  }
  function handleDelete(value) {
    setSousSecteurs(
      _.reject(sousSecteurs, function (o) {
        return o.value === value;
      })
    );
  }
  function handleChipChange(value, name) {
    if (name === "activites") {
      if (sousSecteurs.length === offre.nbActivite) {
        return;
      }
      if (!_.find(sousSecteurs, ["value", value.value])) {
        var v = value;
        v.label = secteur1.label + ": " + v.label;
        setSousSecteurs([value, ...sousSecteurs]);
      }
    } else {
      if (value.value) {
        setSecteur1(value);
        dispatch(Actions.getSousSecteurs(value.value));
      }
    }
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        !renouveler.loading
          ? form && (
              <div className="flex flex-1 w-full items-center justify-between">
                <div className="flex flex-col items-start max-w-full">
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Typography
                      className="normal-case flex items-center sm:mb-12"
                      component={Link}
                      role="button"
                      to="/offres/renouveler"
                      color="inherit"
                    >
                      <Icon className="mr-4 text-20">arrow_back</Icon>
                      Retour
                    </Typography>
                  </FuseAnimate>

                  <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0">
                      <FuseAnimate
                        animation="transition.slideLeftIn"
                        delay={300}
                      >
                        <div className="text-16 sm:text-20 truncate">
                          Renouveler votre abonnement
                        </div>
                      </FuseAnimate>
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  {tabValue === 0 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(event) => handleChangeTab(event, 1)}
                    >
                      Suivant <Icon>navigate_next</Icon>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="mr-4"
                        onClick={(event) => handleChangeTab(event, 0)}
                      >
                        <Icon>navigate_before</Icon> Précédent
                      </Button>
                      <Button
                        className="whitespace-no-wrap"
                        variant="contained"
                        color="secondary"
                        disabled={sousSecteurs.length === 0}
                        onClick={() => handleSubmit(form, sousSecteurs)}
                      >
                        Passer la commande
                        {renouveler.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )
          : ""
      }
      contentToolbar={
        renouveler.loading || !form ? (
          <div className={classes.root}>
            <LinearProgress color="secondary" />
          </div>
        ) : (
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64 normal-case" label="Détail de l'abonnement" />
            <Tab className="h-64 normal-case" label="Secteurs d'activités" />
          </Tabs>
        )
      }
      content={
        !renouveler.loading
          ? form && (
              <Formsy>
                <div className="p-10  sm:p-24 max-w-2xl">
                  {tabValue === 0 && (
                    <>
                      <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6">
                            <span className={classes.border}>
                              Offres & Activités
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6">
                            <span className={classes.border}>
                              Récapitulatif de votre renouveler
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="mt-16 mb-16">
                        <Grid item xs={12} sm={6} className="border-1">
                          {renouveler.offres &&
                          offre &&
                          renouveler.fournisseur ? (
                            renouveler.offres.map((item, index) => (
                              <Grid container key={index} spacing={3}>
                                <Grid item xs={6} sm={6}>
                                  <strong className="p-1">{item.name}</strong>{" "}
                                  <br />
                                  <span className="p-1">
                                    {item.description}
                                  </span>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                  <FormGroup row>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={offre.id === item.id}
                                          onChange={() =>
                                            handleChangeOffre(item)
                                          }
                                          value={item["@id"]}
                                        />
                                      }
                                      label={
                                        renouveler.fournisseur.currency.name ===
                                        LOCAL_CURRENCY
                                          ? parseFloat(
                                              item.prixMad
                                            ).toLocaleString(
                                              "fr", // leave undefined to use the browser's locale,
                                              // or use a string like 'en-US' to override it.
                                              { minimumFractionDigits: 2 }
                                            ) +
                                            LOCAL_CURRENCY +
                                            " HT / mois"
                                          : parseFloat(
                                              item.prixEur
                                            ).toLocaleString(
                                              "fr", // leave undefined to use the browser's locale,
                                              // or use a string like 'en-US' to override it.
                                              { minimumFractionDigits: 2 }
                                            ) + " € HT / mois"
                                      }
                                    />
                                  </FormGroup>
                                </Grid>
                              </Grid>
                            ))
                          ) : (
                            <ContentLoader
                              height={160}
                              width={400}
                              speed={2}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                            >
                              <circle cx="10" cy="20" r="8" />
                              <rect
                                x="25"
                                y="15"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                              <circle cx="10" cy="50" r="8" />
                              <rect
                                x="25"
                                y="45"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                              <circle cx="10" cy="80" r="8" />
                              <rect
                                x="25"
                                y="75"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                            </ContentLoader>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {renouveler.offres && offre && duree ? (
                            <Table className="w-full -striped">
                              <TableHead className="bg-gray-200">
                                <TableRow>
                                  <TableCell className="font-bold  text-black">
                                    Offre
                                  </TableCell>
                                  <TableCell className="font-bold text-black text-right">
                                    Total HT
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11"
                                  >
                                    <strong>{offre ? offre.name : ""}</strong>
                                    <br />
                                    {parseFloat(offre.prixMad).toLocaleString(
                                      "fr", // leave undefined to use the browser's locale,
                                      // or use a string like 'en-US' to override it.
                                      { minimumFractionDigits: 2 }
                                    )}
                                    * {duree.name + " mois"}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11 text-right"
                                  >
                                    {parseFloat(prixht).toLocaleString(
                                      "fr", // leave undefined to use the browser's locale,
                                      // or use a string like 'en-US' to override it.
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-200">
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11 text-right"
                                  >
                                    Total HT
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11 text-right"
                                  >
                                    {parseFloat(prixht).toLocaleString(
                                      "fr", // leave undefined to use the browser's locale,
                                      // or use a string like 'en-US' to override it.
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </TableCell>
                                </TableRow>
                                {duree.remise ? (
                                  <TableRow className="">
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="truncate text-11 text-right"
                                    >
                                      Remise ({duree.remise}%)
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="truncate text-11 text-right"
                                    >
                                      {parseFloat(remise).toLocaleString(
                                        "fr", // leave undefined to use the browser's locale,
                                        // or use a string like 'en-US' to override it.
                                        { minimumFractionDigits: 2 }
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ) : null}
                                {prixhtNet > 0 && prixhtNet !== prixht ? (
                                  <TableRow className="bg-gray-200">
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="truncate text-11 text-right"
                                    >
                                      Montant NET HT
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="truncate text-11 text-right"
                                    >
                                      {parseFloat(prixhtNet).toLocaleString(
                                        "fr", // leave undefined to use the browser's locale,
                                        // or use a string like 'en-US' to override it.
                                        { minimumFractionDigits: 2 }
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ) : null}
                                <TableRow className="">
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11 text-right"
                                  >
                                    TVA (20%)
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate text-11 text-right"
                                  >
                                    {parseFloat(tva).toLocaleString(
                                      "fr", // leave undefined to use the browser's locale,
                                      // or use a string like 'en-US' to override it.
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </TableCell>
                                </TableRow>

                                <TableRow className="bg-gray-200">
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate font-bold text-11 text-right"
                                  >
                                    Montant TTC
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="truncate font-bold text-13 text-right"
                                  >
                                    {parseFloat(prixTTC).toLocaleString(
                                      "fr", // leave undefined to use the browser's locale,
                                      // or use a string like 'en-US' to override it.
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          ) : (
                            <ContentLoader
                              height={160}
                              width={400}
                              speed={2}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                            >
                              <circle cx="10" cy="20" r="8" />
                              <rect
                                x="25"
                                y="15"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                              <circle cx="10" cy="50" r="8" />
                              <rect
                                x="25"
                                y="45"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                              <circle cx="10" cy="80" r="8" />
                              <rect
                                x="25"
                                y="75"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                              />
                            </ContentLoader>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6">
                            <span className={classes.border}>
                              Mode de paiement{" "}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6">
                            <span className={classes.border}>
                              Durée de votre abonnement
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} className="mt-6 mb-16">
                        <Grid item xs={12} sm={6} className="border-1">
                          {renouveler.paiements ? (
                            renouveler.paiements.map((item, index) => (
                              <FormControlLabel
                                onChange={() => setMode(item["@id"])}
                                key={index}
                                value={item["@id"]}
                                checked={mode === item["@id"]}
                                control={<Radio />}
                                label={item.name}
                              />
                            ))
                          ) : (
                            <ContentLoader
                              height={70}
                              width={400}
                              speed={2}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                            >
                              <circle cx="15" cy="17" r="6" />
                              <rect
                                x="25"
                                y="11"
                                rx="5"
                                ry="5"
                                width="100"
                                height="12"
                              />
                              <circle cx="145" cy="17" r="6" />
                              <rect
                                x="155"
                                y="11"
                                rx="5"
                                ry="5"
                                width="100"
                                height="12"
                              />
                            </ContentLoader>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6} className="border-1">
                          {renouveler.durees && duree ? (
                            renouveler.durees.map((item, index) => (
                              <>
                                <FormControlLabel
                                  onChange={() => handleChangeDuree(item)}
                                  key={index}
                                  value={item["@id"]}
                                  checked={duree.id === item.id}
                                  control={<Radio />}
                                  label={item.name + " mois"}
                                />

                                {item.remise ? (
                                  <span className="text-12 text-red">
                                    (Soit {item.remise}% de remise )
                                  </span>
                                ) : (
                                  ""
                                )}
                              </>
                            ))
                          ) : (
                            <ContentLoader
                              height={70}
                              width={400}
                              speed={2}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                            >
                              <circle cx="15" cy="17" r="6" />
                              <rect
                                x="25"
                                y="11"
                                rx="5"
                                ry="5"
                                width="100"
                                height="12"
                              />
                              <circle cx="145" cy="17" r="6" />
                              <rect
                                x="155"
                                y="11"
                                rx="5"
                                ry="5"
                                width="100"
                                height="12"
                              />
                            </ContentLoader>
                          )}
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} className="mt-6 mb-16">
                        <Grid item xs={12} sm={12} className="flex justify-end">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={(event) => handleChangeTab(event, 1)}
                          >
                            Suivant <Icon>navigate_next</Icon>
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  {tabValue === 1 && (
                    <>
                      <Grid container spacing={3} className="">
                        <Grid item xs={12}>
                          <Typography className="mb-16" variant="h6">
                            <span className={classes.border}>
                              Secteurs & Activités
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="mt-16 mb-16">
                        <Grid item xs={12} sm={6}>
                          <SelectReactFormsy
                            id="secteurs"
                            name="secteurs"
                            value={secteur1}
                            placeholder="Sélectionner.. "
                            textFieldProps={{
                              label: "Secteurs",
                              InputLabelProps: {
                                shrink: true,
                              },
                              variant: "outlined",
                            }}
                            className="mb-16"
                            options={renouveler.secteurs}
                            isLoading={renouveler.loadingSecteurs}
                            onChange={(value) =>
                              handleChipChange(value, "secteurs")
                            }
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <SelectReactFormsy
                            id="activites"
                            name="activites"
                            value=""
                            placeholder="Sélectionner.. "
                            textFieldProps={{
                              label: "Activités",
                              InputLabelProps: {
                                shrink: true,
                              },
                              variant: "outlined",
                            }}
                            className="mb-16"
                            options={renouveler.sousSecteurs}
                            isLoading={renouveler.loadingSS}
                            onChange={(value) =>
                              handleChipChange(value, "activites")
                            }
                            required
                          />
                          <Typography variant="caption">
                            {offre &&
                              (offre.nbActivite > sousSecteurs.length
                                ? `Vous pouvez encore ajouter ${
                                    offre.nbActivite - sousSecteurs.length
                                  } activités`
                                : `Vous avez atteint la limite de ${offre.nbActivite} activités`)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="">
                        <Grid item xs={12} sm={6}>
                          <Typography className="mb-16" variant="h6">
                            <span className={classes.border}>
                              Activité(s) choisie(s)
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography className="mb-16" variant="h6">
                            <span className={classes.border}>Suggestions </span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="mt-4">
                        <Grid item xs={12} sm={6} className="border-1">
                          <div className={clsx(classes.chips)}>
                            {sousSecteurs &&
                              sousSecteurs.length > 0 &&
                              _.sortBy(sousSecteurs, [
                                function (o) {
                                  return o.label;
                                },
                              ]).map((item, index) => (
                                <Chip
                                  key={index}
                                  label={item.label}
                                  color="primary"
                                  onDelete={() => handleDelete(item.value)}
                                  className="mt-8 mr-8"
                                />
                              ))}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} className="border-1">
                          {renouveler.fournisseur ? (
                            <>
                              <Typography className="mt-4" variant="caption">
                                {
                                  "Si vos secteurs ou activités n´existent pas, veuillez nous les envoyer en cliquant"
                                }
                              </Typography>

                              <div className="mt-4">
                                <Link2
                                  component="button"
                                  variant="body2"
                                  color="secondary"
                                  onClick={handleClickOpen}
                                >
                                  Suggerer d'autres secteurs et activités
                                </Link2>
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="form-dialog-title"
                                >
                                  <DialogTitle id="form-dialog-title">
                                    Vos suggestions
                                  </DialogTitle>
                                  <DialogContent>
                                    <Typography variant="caption">
                                      Ces suggestions seront prises en compte
                                      par l'administrateur dans les plus brefs
                                      délais.
                                    </Typography>

                                    <Grid container spacing={3}>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          className="mt-8 mb-16"
                                          error={secteur.length <= 2}
                                          required
                                          label="Secteur"
                                          autoFocus
                                          value={secteur}
                                          id="secteur"
                                          name="secteur"
                                          onChange={(event) =>
                                            setSecteur(event.target.value)
                                          }
                                          variant="outlined"
                                          fullWidth
                                          helperText={
                                            secteur.length <= 2
                                              ? "Ce champ doit contenir au moins 3 caractères"
                                              : ""
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          className="mt-8 mb-16"
                                          id="sousSecteur"
                                          name="sousSecteur"
                                          error={sousSecteur.length <= 2}
                                          onChange={(event) =>
                                            setSousSecteur(event.target.value)
                                          }
                                          label="Activité"
                                          type="text"
                                          required
                                          value={sousSecteur}
                                          variant="outlined"
                                          fullWidth
                                          helperText={
                                            sousSecteur.length <= 2
                                              ? "Ce champ doit contenir au moins 3 caractères "
                                              : ""
                                          }
                                        />
                                      </Grid>
                                    </Grid>
                                  </DialogContent>
                                  <Divider />
                                  <DialogActions>
                                    <Button
                                      onClick={handleClose}
                                      variant="outlined"
                                      color="primary"
                                    >
                                      Annuler
                                    </Button>
                                    <Button
                                      onClick={handleSubmitActivites}
                                      variant="contained"
                                      color="secondary"
                                      disabled={
                                        renouveler.loadingSuggestion ||
                                        sousSecteur.length < 2 ||
                                        secteur.length <= 2
                                      }
                                    >
                                      Sauvegarder
                                      {renouveler.loadingSuggestion && (
                                        <CircularProgress
                                          size={24}
                                          className={classes.buttonProgress}
                                        />
                                      )}
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </>
                          ) : (
                            <ContentLoader
                              height={70}
                              width={400}
                              speed={2}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                            >
                              <rect
                                x="1"
                                y="13"
                                rx="5"
                                ry="5"
                                width="220"
                                height="24"
                              />
                            </ContentLoader>
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mt-16 mb-16 flex justify-end"
                      >
                        <Grid item xs={12} sm={6} className="flex justify-end">
                          <Button
                            variant="outlined"
                            color="secondary"
                            className="mr-4"
                            onClick={(event) => handleChangeTab(event, 0)}
                          >
                            <Icon>navigate_before</Icon> Précédent
                          </Button>
                          <Button
                            className="whitespace-no-wrap"
                            variant="contained"
                            color="secondary"
                            disabled={sousSecteurs.length === 0}
                            onClick={() => handleSubmit(form, sousSecteurs)}
                          >
                            Passer la commande
                            {renouveler.loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </div>
              </Formsy>
            )
          : ""
      }
      innerScroll
    />
  );
}

export default withReducer("renouvelerOffreFrsApp", reducer)(Renouveler);
