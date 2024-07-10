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

export default function BioFournisseur(props) {
    const classes = useStyles();

    return (
        <CardActionArea component={NavLinkAdapter}
            to={'/register/1'} >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5" className="uppercase">
                            Vendre
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className="text-justify">
                            Créez un compte fournisseur <strong className="uppercase">gratuitement</strong> vous permet de toucher un grand nombre de vos futurs clients en un temps record.
                        </Typography>
                        <List >
                            <ListItem classes={{
                                root: 'pl-0'
                            }}>
                                <ListItemAvatar>
                                    <Avatar className={classes.mainAvatar}>
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
                                    <Avatar className={classes.lightAvatar}>
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
                                    <Avatar className={classes.darkAvatar}>
                                        <Icon >remove_red_eye</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className="text-justify"
                                    primary="Profitez de notre large audience. Plus de 200.000 acheteurs potentiels nous visitent chaque jour"
                                />
                            </ListItem>
                        </List>
                        <Typography variant="subtitle1" color="primary">
                            Créez un compte Fournisseur
                        </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <CardMedia className={classes.cardMedia} image='https://source.unsplash.com/collection/11353394' title='Inscrivez-vous' />
                </Hidden>
            </Card>
        </CardActionArea>
    );
}

BioFournisseur.propTypes = {
    post: PropTypes.object,
};