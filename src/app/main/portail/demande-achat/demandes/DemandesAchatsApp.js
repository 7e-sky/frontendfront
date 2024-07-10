import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { Typography, Grid, Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import SideBareSearch from './SideBareSearch';
import HomeIcon from '@material-ui/icons/Home';
import ContentList from './ContentList';
import _ from '@lodash';
import { Helmet } from "react-helmet";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // minHeight      : '100%',
        position: 'relative',
        flex: '1 0 auto',
        height: 'auto',
        backgroundColor: theme.palette.background.default
    },
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    breadcrumbs: {
        fontSize: 11,
    },
    link: {
        display: 'flex',
        'align-items': 'center',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    grid: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    }
}));

function useQuery(location) {
    return new URLSearchParams(location.search);
}

function DemandesAchatsApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");
    const ville = query.get("ville");
    const parametres = useSelector(({ demandesAchat }) => demandesAchat.demandes.parametres);

    useEffect(() => {

        function updateDemandeAchatState() {
            dispatch(Actions.getDemandeAchats(params, pays, ville, parametres));
        }

        updateDemandeAchatState();
    }, [dispatch, params, pays, ville, parametres]);

    useEffect(() => {

        function updateDemandeAchatState() {
            if (!secteur && !pays) {
                dispatch(Actions.getSecteursAndPaysCounts());
            }
            if (!secteur && pays) {
                dispatch(Actions.getSecteursCounts(params, pays, ville));
                dispatch(Actions.getVilleCounts(params, pays));
            }
            if (secteur && !pays) {
                if (activite) {
                    dispatch(Actions.getCategoriesCounts(params, pays, ville));

                } else {
                    dispatch(Actions.getActivitesCounts(params, pays, ville));

                }
                dispatch(Actions.getPaysCounts(params, pays));

            }
            if (secteur && pays) {
                if (activite) {
                    dispatch(Actions.getCategoriesCounts(params, pays, ville));

                } else {
                    dispatch(Actions.getActivitesCounts(params, pays, ville));

                }
                dispatch(Actions.getVilleCounts(params, pays));

            }
        }

        updateDemandeAchatState();
    }, [dispatch, params, pays, ville]);

    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
            <Helmet>
                <title>Toutes les demandes d'achat {
                    activite ? _.capitalize(activite.replace('-', ' ')) :
                        (secteur ? _.capitalize(secteur.replace('-', ' ')) : '')
                }
                    {
                        pays ? ' au ' + _.capitalize(pays.replace('-', ' ')) : ''
                    }</title>
                <meta name="description" content='d' />
            </Helmet>
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container spacing={2}
                    classes={{
                        'spacing-xs-2': classes.grid
                    }}
                    className="max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs} aria-label="breadcrumb">
                                <Link color="inherit" to="/" className={classes.link}>
                                    <HomeIcon className={classes.icon} />
                                    Accueil
                                </Link>
                                {
                                    secteur ?
                                        <Link color="inherit" to={`/demandes-achats/${secteur}`} className={classes.link}>
                                            {_.capitalize(secteur.replace('-', ' '))}
                                        </Link>
                                        : ''
                                }
                                {
                                    activite &&
                                    <span className="text-white">
                                        {_.capitalize(activite.replace('-', ' '))}
                                    </span>

                                }
                                {
                                    categorie &&
                                    <span className="text-white">
                                        {_.capitalize(categorie.replace('-', ' '))}
                                    </span>

                                }


                            </Breadcrumbs>

                        </FuseAnimate>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2}
                classes={{
                    'spacing-xs-2': classes.grid
                }}
                className="max-w-2xl mx-auto sm:px-16 pt-24 items-start">
                <Grid item sm={12} xs={12}>
                    <Typography variant="h1" className="text-24 font-bold">Toutes les demandes d'achat
                        {
                            activite ? _.capitalize(activite.replace('-', ' ')) :
                                (secteur ? _.capitalize(secteur.replace('-', ' ')) : '')
                        }
                        {
                            pays ? ' au ' + _.capitalize(pays.replace('-', ' ')) : ''
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}
                classes={{
                    'spacing-xs-2': classes.grid
                }} className="max-w-2xl mx-auto py-24 sm:px-16 items-start">

                <Grid item sm={4} md={3} xs={12} className="sticky top-0 order-last sm:order-first">
                    <SideBareSearch  {...props} />
                </Grid>
                <Grid item sm={8} md={9} xs={12}>
                    <ContentList />
                </Grid>
            </Grid>
        </div>


    )
}

export default withReducer('demandesAchat', reducer)(DemandesAchatsApp);