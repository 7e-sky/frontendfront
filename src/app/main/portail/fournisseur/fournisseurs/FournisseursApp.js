import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { Typography, Grid, Breadcrumbs, Button, LinearProgress, Paper, Icon } from '@material-ui/core';
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
import ContactFournisseurDialog from '../ficheFournisseur/ContactFournisseurDialog';
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
    img: {
        width: '70%'

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

function FournisseursApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");
    const q = query.get("q");
    const ville = query.get("ville");
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.parametres);
    const fournisseurs = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.data);
    const loading = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loading);
    const secteurs = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.secteurs);
    const activites = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.activites);
    const categories = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.categories);

    useEffect(() => {

        function updateFournisseurState() {
            dispatch(Actions.getFournisseurs(params, pays, parametres, ville, q));
        }

        updateFournisseurState();
    }, [dispatch, params, pays, parametres, ville, q]);

    useEffect(() => {

        function updateFournisseurState() {
            if (!secteur && !pays) {
                dispatch(Actions.getSecteursAndPaysCounts(q));
            }
            if (!secteur && pays) {
                dispatch(Actions.getSecteursCounts(params, pays, ville, q));
                dispatch(Actions.getVilleCounts(params, pays, q));
            }
            if (secteur && !pays) {
                if (activite) {
                    dispatch(Actions.getCategoriesCounts(params, pays, ville, q));

                } else {
                    dispatch(Actions.getActivitesCounts(params, pays, ville, q));

                }
                dispatch(Actions.getPaysCounts(params, pays, q));
            }
            if (secteur && pays) {
                if (activite) {
                    dispatch(Actions.getCategoriesCounts(params, pays, ville, q));

                } else {
                    dispatch(Actions.getActivitesCounts(params, pays, ville, q));

                }
                dispatch(Actions.getVilleCounts(params, pays, q));
            }
        }

        updateFournisseurState();
    }, [dispatch, params, pays, ville, q]);

    function handleUrlProduits() {

        let secteurParm = '';
        let activiteParm = '';
        let categorieParm = '';

        if (secteur) {
            secteurParm = '/' + secteur;
        }
        if (activite) {
            activiteParm = '/' + activite;
        }
        if (categorie) {
            categorieParm = '/' + categorie;
        }

        let searchText;

        if (pays)
            searchText = (q ? '&q=' + q : '')
        else searchText = (q ? 'q=' + q : '')

        const path = secteurParm + activiteParm + categorieParm;
        props.history.push({ pathname: '/vente-produits' + path, search: (pays ? 'pays=' + pays : '') + searchText })

    }
    function getPath(fournisseurs) {
        return categorie ? 'de [ ' + getCategorieTitle() + ' ]' :
            activite ? 'de [ ' + getActiviteTitle() + ' ]' :
                secteur ? 'de [ ' + getSecteurTitle() + ' ]' : '';
    }

    function getSecteurTitle() {
        return secteurs.length > 0 ? secteurs.filter(x => x.slug === secteur)[0] && _.capitalize(secteurs.filter(x => x.slug === secteur)[0].name) : _.capitalize(secteur.replace('-', ' '))
    }
    function getActiviteTitle() {
        return activites.length > 0 ? activites.filter(x => x.slug === activite)[0] && _.capitalize(activites.filter(x => x.slug === activite)[0].name) : _.capitalize(activite.replace('-', ' '))
    }
    function getCategorieTitle() {
        return categories.length > 0 ? categories.filter(x => x.slug === categorie)[0] && _.capitalize(categories.filter(x => x.slug === categorie)[0].name) : _.capitalize(categorie.replace('-', ' '))
    }
    if (loading) {
        return (
            <div className="flex flex-col min-h-md">
                <LinearProgress color="secondary" />
            </div>)
    }

    if (!loading && fournisseurs.length === 0) {
        return (
            <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
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
                                            <Link color="inherit" to={`/entreprises/${secteur}`} className={classes.link}>
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
                                    {
                                        q &&
                                        <span className="text-white">
                                            {'#' + _.capitalize(q)}
                                        </span>

                                    }


                                </Breadcrumbs>

                            </FuseAnimate>
                        </Grid>
                    </Grid>
                </div>

                <div className="w-full max-w-2xl mx-auto   min-h-md">
                    <Helmet>
                        <title>{'Fournisseurs ' + (
                            categorie ? 'de ' + _.capitalize(categorie) :
                                activite ? 'de ' + _.capitalize(activite) :
                                    secteur ? 'de ' + _.capitalize(secteur) : ''
                        ) + (pays ? _.capitalize(pays) : '') + (q ? ' #' + _.capitalize(q) : '')
                        }</title>
                        <meta name="robots" content="noindex, nofollow" />
                        <meta name="googlebot" content="noindex" />
                    </Helmet>


                    <Paper className="p-32 w-full my-6 text-center">
                        <img className={classes.img} alt="product not found" src="assets/images/product_not_found.jpg" />
                        <Typography variant="h6" className="mb-16 uppercase" >

                            Oups! Nous n'avons pas pu trouver de résultats pour votre recherche
                        </Typography>

                        <Typography variant="h6" className="mb-16 uppercase" color="primary">
                            Les fournisseurs de ce secteur seront affichés prochainement
                        </Typography>

                        <Button variant="outlined" size="small" color="secondary" onClick={() => props.history.goBack()} className={clsx(classes.btn, "mr-8")}>
                            <Icon>chevron_left</Icon> <span className="transition ease-in-out duration-700 ">Retour</span>
                        </Button>

                    </Paper>
                </div>
            </div>
        )
    }
    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
            {
                fournisseurs.length > 0 &&
                <Helmet>
                    <title>{_.truncate('Fournisseurs ' + (getPath(fournisseurs)) + (pays ? _.capitalize(fournisseurs[0].pays && ' au ' + fournisseurs[0].pays.name) : '')
                        , { 'length': 70, 'separator': ' ' })}</title>
                    {
                        q && <meta property="keyword" content={q} />
                    }
                    <meta name="description" content={_.truncate('Les achats industriels la place de marché numéro 1 au maroc, trouver vos fournisseurs de ' + (categorie && getCategorieTitle() + ', ') + (activite && getActiviteTitle() + ', ') + (secteur && getSecteurTitle()), { 'length': 160, 'separator': ' ' })} />
                    <meta property="og:title" content={_.truncate('Fournisseurs ' + (getPath(fournisseurs)) + (pays ? _.capitalize(fournisseurs[0].pays && ' au ' + fournisseurs[0].pays.name) : ''), { 'length': 70, 'separator': ' ' })} />
                    <meta property="twitter:title" content={_.truncate('Vente de fournisseurs ' + (getPath(fournisseurs)) + (pays ? _.capitalize(fournisseurs[0].pays && ' au ' + fournisseurs[0].pays.name) : ''), { 'length': 70, 'separator': ' ' })} />
                </Helmet>

            }


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
                                        <Link color="inherit" to={`/entreprises/${secteur}`} className={classes.link}>
                                            {getSecteurTitle()}
                                        </Link>
                                        : ''
                                }

                                {
                                    fournisseurs.length > 0 && activite &&
                                    <Link color="inherit" to={`/entreprises/${secteur}/${activite}`} className={classes.link}>
                                        {getActiviteTitle()}
                                    </Link>

                                }
                                {
                                    fournisseurs.length > 0 && categorie &&
                                    <span className="text-white">
                                        {getCategorieTitle()}
                                    </span>

                                }
                                {
                                    q &&
                                    <span className="text-white">
                                        {'#' + _.capitalize(q)}
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
                className="max-w-2xl mx-auto sm:px-16 pt-24 items-center">
                <Grid item sm={8} xs={12}>
                    {
                        fournisseurs.length > 0 &&
                        <Typography variant="h1" className="text-24 font-bold">
                            {'Fournisseurs ' + (getPath(fournisseurs)) + (pays ? _.capitalize(fournisseurs[0].pays && ' au ' + fournisseurs[0].pays.name) : '')
                            }
                        </Typography>
                    }

                </Grid>
                <Grid item sm={4} xs={12} className="flex items-center justify-between ">
                    <Typography className="text-13 mr-16">Voir résultats de:</Typography>
                    <Button onClick={handleUrlProduits} color="secondary" size="small" >
                        Produits
                    </Button>
                    |
                    <Button size="small" disabled >
                        fournisseurs
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}
                classes={{
                    'spacing-xs-2': classes.grid
                }}
                className="max-w-2xl mx-auto py-24 sm:px-16 items-start">

                <Grid item sm={4} md={3} xs={12} className="sticky top-0 order-last sm:order-first">
                    <SideBareSearch  {...props} />
                </Grid>
                <Grid item sm={8} md={9} xs={12}>
                    <ContentList />
                </Grid>
            </Grid>
            <ContactFournisseurDialog />
        </div>


    )
}

export default withReducer('fournisseursApp', reducer)(FournisseursApp);