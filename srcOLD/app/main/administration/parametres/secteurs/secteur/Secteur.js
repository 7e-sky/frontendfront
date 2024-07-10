import React, { useEffect, useState, useRef } from "react";
import { Button, Tab, Tabs, Icon, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FusePageCarded, URL_SITE, TextFieldFormsy } from "@fuse";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import _ from "@lodash";
import Formsy from "formsy-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import clsx from "clsx";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  profileImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  profileImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $profileImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $profileImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $profileImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function Secteur(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const secteur = useSelector(({ secteursApp }) => secteursApp.secteur);
  const formRef = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    function updateSecteurstate() {
      const params = props.match.params;
      const { secteurId } = params;

      if (secteurId === "new") {
        dispatch(Actions.newSecteur());
      } else {
        dispatch(Actions.getSecteur(secteurId));
      }
    }

    updateSecteurstate();
    return () => {
      dispatch(Actions.cleanUp());
    };
  }, [dispatch, props.match.params]);

  //SET ERRORS IN INPUTS AFTER ERROR API
  useEffect(() => {
    if (secteur.error && tabValue === 0 && secteur.error.name) {
      formRef.current.updateInputsWithError({
        ...secteur.error,
      });
    }
  }, [secteur.error]);

  //SET FORM DATA
  useEffect(() => {
    if (
      (secteur.data && !form) ||
      (secteur.data && form && secteur.data.id !== form.id)
    ) {
      setForm({ ...secteur.data });
    }
  }, [form, secteur.data, setForm]);

  useEffect(() => {
    if (secteur.image) {
      setForm(_.set({ ...form }, "image", secteur.image));
    }
  }, [secteur.image]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  // UPLOAD
  function handleUploadSecteurChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    dispatch(Actions.uploadAttachement(file, form.id));
  }

  function handleSubmit(model) {
    const params = props.match.params;
    const { secteurId } = params;

    if (secteurId === "new") {
      dispatch(Actions.saveSecteur(form, props.history));
    } else {
      dispatch(Actions.updateSecteur(form, props.history));
    }
    //  dispatch(Actions.updateUserInfo(model, form.id));
  }

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
                  to="/parametres/secteurs"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Secteurs
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.name ? form.name : "Nouveau Secteur"}
                    </Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap"
                variant="contained"
                disabled={secteur.loadingSSS || !form.name || !form.image}
                onClick={() => handleSubmit(form)}
              >
                Sauvegarder
                {secteur.loadingSSS && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={
        form && (
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64 normal-case" label="Infos secteur" />
            <Tab className="h-64 normal-case" label="File" />
          </Tabs>
        )
      }
      content={
        secteur.requestSecteur ? (
          <LinearProgress color="secondary" />
        ) : (
          form && (
            <div className=" sm:p-10 max-w-2xl">
              {tabValue === 0 && (
                <Formsy ref={formRef} className="flex pt-5 flex-col ">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        label="Nom du secteur"
                        validations={{
                          minLength: 3,
                        }}
                        validationErrors={{
                          minLength: "La longueur minimale de caractère est 3",
                        }}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Formsy>
              )}

              {tabValue === 1 && (
                <div>
                  <input
                    className="hidden"
                    id="button-file"
                    type="file"
                    disabled={secteur.secteurReqInProgress}
                    onChange={handleUploadSecteurChange}
                  />
                  <div className="flex justify-center sm:justify-start flex-wrap">
                    <label
                      htmlFor="button-file"
                      className={clsx(
                        classes.secteurImageUpload,
                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                      )}
                    >
                      {secteur.secteurReqInProgress ? (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      ) : (
                        <Icon fontSize="large" color="action">
                          arrow_upward
                        </Icon>
                      )}
                    </label>

                    {form.image ? (
                      <div
                        className={clsx(
                          classes.secteurImageItem,
                          "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5"
                        )}
                        onClick={
                          form.image
                            ? () =>
                                window.open(URL_SITE + form.image.url, "_blank")
                            : ""
                        }
                      >
                        <img
                          className="max-w-none w-auto h-full"
                          src={URL_SITE + form.image.url}
                          alt={form.name}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        )
      }
      innerScroll
    />
  );
}

export default withReducer("secteursApp", reducer)(Secteur);
