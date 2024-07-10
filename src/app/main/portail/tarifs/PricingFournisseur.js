import React from "react";
import {
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, LOCAL_CURRENCY } from "@fuse";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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

function PricingFournisseur(props) {
  const classes = useStyles();
  const { currency } = props;
  return (
    <div>
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
                        primary="Présentations de Produits / Services"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Images / Photos"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Fiches Techniques"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Vidéos"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Réception des demandes par produit exposé"
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
                        primary="Activités"
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
                        primary="Mini-site de votre société"
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
                        primary="Catalogues produits"
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
                        primary="Catalogues produits PDF téléchargeable"
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
                        primary="Réception de demande de devis ( RFQ ) par mail"
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
                        primary="Gestion commerciale"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Création d’Agences / Services"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Affectation les demandes d’achats ( RFQ )"
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
                            "text-10 sm:text-12 md:text-14 lg:text-15 ml-16",
                        }}
                        primary="Suivi des ventes de vos Agences / Services"
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
                        primary="Présentation de produit en « 1ere Page »"
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
                        primary="Bannière publicitaire 720x90px en « 1ere Page »"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={8} container spacing={1}>
                {
                  // FREE
                }
                <Grid item xs={12} sm={6} md={3} container>
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
                          primary="Max 5"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="Max 5"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="Max 5"
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
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="Limité par Nbr. produits"
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
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="illimité"
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
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
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
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {
                  // FIN FREE
                }
                {
                  // CLASSIC
                }
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="flex hidden sm:block md:block lg:block "
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      background:
                        "linear-gradient(to top left, #9ae6b4 10%, #9ae6b4 30%, #38a169 60%, #38a169 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #38a169",
                    }}
                    className="text-center h-160 "
                  >
                    <div className="text-black uppercase font-extrabold pt-16 text-24">
                      CLASSIC
                    </div>
                    <div className="flex justify-center mt-12 text-black">
                      <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                        {currency === 0 ? LOCAL_CURRENCY : "$"}
                      </span>
                      <span className=" uppercase font-extrabold text-32">
                        {currency === 0 ? "250" : "25"}
                        <span className="text-10">
                          ,00 / mois
                          {currency === 0 && " HT"}
                        </span>
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
                          primary="5 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
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
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="Jusqu'à 3 activités"
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
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="illimité"
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
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
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
                          primary="1 produit (1 mois)"
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
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {
                  // FIN CLASSIC
                }
                {
                  // BUSINESS
                }
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="flex hidden sm:hidden md:block lg:block "
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      background:
                        "linear-gradient(to top left, #90cdf4 10%, #90cdf4 30%, #3182ce 60%, #3182ce 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #3182ce",
                    }}
                    className="text-center h-160 "
                  >
                    <div className="text-black uppercase font-extrabold pt-16 text-24">
                      BUSINESS
                    </div>
                    <div className="flex justify-center mt-12 text-black">
                      <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                        {currency === 0 ? LOCAL_CURRENCY : "$"}
                      </span>
                      <span className=" uppercase font-extrabold text-32">
                        {currency === 0 ? "350" : "35"}
                        <span className="text-10">
                          ,00 / mois
                          {currency === 0 && " HT"}
                        </span>
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
                          primary="5 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
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
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="Jusqu'à 5 activités"
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
                          primary="10 pages"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="illimité"
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
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
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
                              "text-10 sm:text-12 md:text-14 lg:text-15 ",
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
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
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
                          primary="1 produit (1 mois)"
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
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {
                  // FIN BUSINESS
                }
                {
                  // GLOD
                }
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="flex hidden sm:hidden md:block lg:block "
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      background:
                        "linear-gradient(to top left, #faf089 10%, #faf089 30%, #d69e2e 60%, #d69e2e 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #d69e2e",
                    }}
                    className="text-center h-160 "
                  >
                    <div className="text-black uppercase font-extrabold pt-16 text-24">
                      GOLD
                    </div>
                    <div className="flex justify-center mt-12 text-black">
                      <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                        {currency === 0 ? LOCAL_CURRENCY : "$"}
                      </span>
                      <span className=" uppercase font-extrabold text-32">
                        {currency === 0 ? "450" : "45"}
                        <span className="text-10">
                          ,00 / mois
                          {currency === 0 && " HT"}
                        </span>
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
                          primary="5 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="1 par produit"
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
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="Jusqu'à 10 activités"
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
                          primary="20 pages"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="illimité"
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
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
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
                              "text-10 sm:text-12 md:text-14 lg:text-15 ",
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
                            primary: "text-10 sm:text-12 md:text-14 lg:text-15",
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
                          primary="2 produit (3 mois)"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary="1 bannière (6 mois)"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {
                  // FIN GLOD
                }
              </Grid>
            </Grid>
          </FuseAnimate>
          {/**
                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">

                        <Typography variant="h4" className="pb-32 font-light">Frequently Asked Questions</Typography>

                        <div className="flex flex-wrap w-full">

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">How does free trial work?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                                    accumsan. In dignissim laoreet ipsum eu interdum.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I cancel any time?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                                    Donec maximus ipsum in malesuada hendrerit.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">What happens after my trial ended?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                                    Donec maximus ipsum in malesuada hendrerit.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I have a discount?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                                    accumsan. In dignissim laoreet ipsum eu interdum.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    */}
        </div>
      </div>
    </div>
  );
}

export default PricingFournisseur;
