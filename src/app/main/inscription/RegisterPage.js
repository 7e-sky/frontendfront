import React, { useState, useEffect } from 'react';
import { Tabs, Card, CardContent, Typography, Tab, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Icon } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import FournisseurTab from './tabs/FournisseurTab';
import AcheteurTab from './tabs/AcheteurTab';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.secondary.dark, 0.5) + ' 0%, ' + theme.palette.secondary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    },
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    green: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    inscription: {
        backgroundColor: '#f6f6f6',
        borderLeft: ' 1px solid #d9d9d9',
        [theme.breakpoints.down('xs')]: {
            borderLeft: 'none',
            borderTop: ' 1px solid #d9d9d9',
        }
    }
}));


function RegisterPage(props) {

    const classes = useStyles();
    const params = props.match.params;
    const { page } = params;
    const [selectedTab, setSelectedTab] = useState(page <= 2 && page >= 1 ? page - 1 : 0);

    useEffect(() => {
        setSelectedTab(page <= 2 && page >= 1 ? page - 1 : 0);
    }, [page]);

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="  max-w-xl">

                        <CardContent className={clsx("flex flex-col items-center justify-center", classes.cardcontent)}>

                            <Grid container >
                                <Grid item sm={7} xs={12} className="p-32">

                                    <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Inscrivez-vous en tant que :</Typography>

                                    <Tabs
                                        value={selectedTab}
                                        onChange={handleTabChange}
                                        variant="fullWidth"
                                        className="mb-32"
                                    >
                                        <Tab
                                            icon={<img className="h-40 " src="assets/images/logos/manufacture.png" alt="Fournisseur" />}
                                            className="min-w-0"
                                            label="Fournisseur"
                                        />
                                        <Tab
                                            icon={<img className="h-40" src="assets/images/logos/customer-behavior.png" alt="Acheteur" />}
                                            className="min-w-0"
                                            label="Acheteur"
                                        />

                                    </Tabs>

                                    {selectedTab === 0 && <FournisseurTab {...props} />}
                                    {selectedTab === 1 && <AcheteurTab {...props} />}


                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <span className="font-medium text-blue">Vous avez déjà un compte?</span>
                                        <Link className="font-medium text-blue" to="/login">Connexion</Link>
                                    </div>
                                </Grid>

                                <Grid item sm={5} xs={12} className={clsx(" p-32", classes.inscription)}>
                                    {
                                        selectedTab === 0 ?
                                            <div>
                                                <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Création de compte <strong>FOURNISSEUR</strong></Typography>

                                                <Typography variant="subtitle1" color="textSecondary" className="text-justify">
                                                    Créez un compte fournisseur <strong className="uppercase">gratuitement</strong> vous permet de toucher un grand nombre de vos futurs clients en un temps record.
                                                </Typography>
                                                <List >
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >local_mall</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Que vous soyez novice sur internet ou expert en e-commerce, nous vous aidons à augmenter vos prospects"
                                                        />
                                                    </ListItem>
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >people_outline</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Élargissez votre réseau de clients avec de nouveaux acheteurs au niveau local, national et international"
                                                        />
                                                    </ListItem>
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >remove_red_eye</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Profitez de notre large audience. Plus de 200.000 acheteurs potentiels nous visitent chaque jour"
                                                        />
                                                    </ListItem>
                                                </List>

                                            </div>
                                            :
                                            <div>
                                                <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Création de compte <strong>acheteur</strong></Typography>
                                                <Typography variant="subtitle1" color="textSecondary" className="text-justify" >
                                                    Créez un compte acheteur <strong className="uppercase">gratuitement</strong> vous permet d'avoir un pouvoir négociateur puissant, garanti et très important.
                                                </Typography>
                                                <List>
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >star_border</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Que vous ayez un service d'achat développé ou pas encore, vous serez contacté par les meilleurs fournisseurs."
                                                        />
                                                    </ListItem>
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >list_alt</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Construisez votre panel fournisseurs ( Shortlist ) personnalisé que ce soit par produit ou service."
                                                        />
                                                    </ListItem>
                                                    <ListItem classes={{
                                                        root: 'pl-0'
                                                    }}>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon >timeline</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-justify"
                                                            primary="Augmentez votre valeur ajoutée en employant moins de temps à la recherche des fournisseurs."
                                                        />
                                                    </ListItem>
                                                </List>
                                            </div>
                                    }

                                </Grid>
                            </Grid>


                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withRouter(RegisterPage);
