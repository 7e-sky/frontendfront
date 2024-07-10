import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { NavLinkAdapter } from '@fuse';
import { ListItem, ListItemAvatar, Avatar, List, ListItemText, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 260,
    },
    mainAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
    },
    lightAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.primary.light,
    },
    darkAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.primary.dark,
    },
}));

export default function BioAcheteur(props) {
    const classes = useStyles();

    return (
        <CardActionArea component={NavLinkAdapter}
            to={'/register/2'} >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5" className="uppercase">
                            Acheter
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className="text-justify" >
                            Créez un compte acheteur <strong className="uppercase">gratuitement</strong> vous permet d'avoir un pouvoir négociateur puissant, garanti et très important.
                        </Typography>
                        <List>
                            <ListItem classes={{
                                root: 'pl-0'
                            }}>
                                <ListItemAvatar>
                                    <Avatar className={classes.mainAvatar}>
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
                                    <Avatar className={classes.lightAvatar}>
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
                                    <Avatar className={classes.darkAvatar}>
                                        <Icon >timeline</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className="text-justify"
                                    primary="Augmentez votre valeur ajoutée en employant moins de temps à la recherche des fournisseurs."
                                />
                            </ListItem>
                        </List>
                        <Typography variant="subtitle1" color="primary">
                            Créez un compte Acheteur
                        </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <CardMedia className={classes.cardMedia} image='https://source.unsplash.com/collection/11353378' title='Inscrivez-vous' />
                </Hidden>
            </Card>
        </CardActionArea>
    );
}

BioAcheteur.propTypes = {
    post: PropTypes.object,
};