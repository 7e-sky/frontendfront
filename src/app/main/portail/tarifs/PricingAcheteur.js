import React from "react";
import {
  Typography,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, LOCAL_CURRENCY } from "@fuse";
import clsx from "clsx";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  header: {
    height: 300,
    background:
      "linear-gradient(to right, " +
      theme.palette.secondary.dark +
      " 0%, " +
      theme.palette.secondary.main +
      " 100%)",
    color: "white",
  },
  badge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  price: {
    backgroundColor: theme.palette.primary[600],
    //color: theme.palette.getContrastText(theme.palette.primary[600])
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ddd",
  },
}));

function PricingAcheteur(props) {
  const classes = useStyles();
  const { currency } = props;

  return (
    <div>
      <div className={clsx(classes.header, "flex")}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-40 mx-24">
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Typography
                variant="h1"
                color="inherit"
                className="font-bold uppercase text-24 sm:text-32 md:text-44 "
              >
                Tarif Acheteur
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>

      <div className="-mt-160 mb-24">
        <div className="w-full max-w-2xl mx-auto">
          <FuseAnimate duration={400} delay={800}>
            <Grid container>
              <Grid item xs={6} sm={6} md={4} container>
                <Grid item xs={12} className="h-160"></Grid>
                <Grid item xs={12}>
                  <List className={classes.root}>
                    <ListItem classes={{ root: "h-60 sm:h-56 " }}>
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Publication des demandes de devis ( RFQ )"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Réception des devis"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir les profils des Fournisseurs"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56" }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir les catalogues des Fournisseurs"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir le nombre de Fournisseurs Intéressés * "
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Compte anonyme **"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir le nombre de diffusions de la ( RFQ )"
                      />
                    </ListItem>

                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Sous-compte Acheteur ***"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Blackliste"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={8} container spacing={1}>
                {
                  // FREE
                }
                <Grid item xs={12} sm={6} md={6} container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      background:
                        "linear-gradient(to top left, #feb2b2 10%, #feb2b2 30%, #e53e3e 60%, #e53e3e 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #f56565",
                    }}
                    className="text-center h-160 "
                  >
                    <div className="text-black uppercase font-extrabold pt-16 text-24">
                      FREE
                    </div>
                    <div className="flex justify-center mt-12 text-black">
                      <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                        {currency === 0 ? LOCAL_CURRENCY : "$"}
                      </span>
                      <span className=" uppercase font-extrabold text-32">
                        00<span className="text-10">,00</span>
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <List className={classes.root}>
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          justify="center"
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( A venir )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {
                  // FIN FREE
                }
              </Grid>
            </Grid>
          </FuseAnimate>
          <div className="flex flex-col mt-8">
            <Typography variant="caption">
              * Les Fournisseurs qui ont acheté votre Profil pour vous
              contacter.
            </Typography>
            <Typography variant="caption">
              ** Le compte anonyme vous libère de gérer vos achats et les
              fournisseurs ne sauront pas votre identité. Un pourcentage payant
              sera défini en commun accord pour chaque RFQ.
            </Typography>
            <Typography variant="caption">
              *** Sous Compte acheteur vous permet d'ajouter vos collègues ou
              collaborateurs pour plus d'efficacité.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingAcheteur;
