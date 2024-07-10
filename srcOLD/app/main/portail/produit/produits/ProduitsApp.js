import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { Typography, Grid, Breadcrumbs, Button, Icon, Paper, LinearProgress } from '@material-ui/core';
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
import DemandeDevisDialog from '../detailProduit/DemandeDevisDialog';
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

function ProduitsApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");
    const q = query.get("q");
    const ville = query.get("ville");
    const parametres = useSelector(({ produitsApp }) => produitsApp.produits.parametres);
    const produits = useSelector(({ produitsApp }) => produitsApp.produits.data);
    const loading = useSelector(({ produitsApp }) => produitsApp.produits.loading);

    useEffect(() => {

        function updateProduitState() {
            dispatch(Actions.getProduits(params, pays, parametres, ville, q));
        }

        updateProduitState();
    }, [dispatch, params, pays, q, ville, parametres]);

    useEffect(() => {

        function updateProduitState() {

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

        updateProduitState();
    }, [dispatch, params, pays, ville, q]);

    function handleUrlFournisseurs() {
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
        props.history.push({ pathname: '/entreprises' + path, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText })
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-md">
                <LinearProgress color="secondary" />
            </div>)
    }

    if (!loading && produits.length === 0) {
        return (
            <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
                <div
                    className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                    <Grid container
                        classes={{
                            'spacing-xs-2': classes.grid
                        }}
                        className="max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                        <Grid item sm={12} xs={12}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs}>
                                    <Link color="inherit" to="/" className={classes.link}>
                                        <HomeIcon className={classes.icon} />
                                        Accueil
                                </Link>
                                    {
                                        produits.length > 0 && secteur &&
                                        <Link color="inherit" to={`/vente-produits/${secteur}`} className={classes.link}>
                                            {_.capitalize(produits[0].secteur && produits[0].secteur.name)}
                                        </Link>

                                    }
                                    {
                                        produits.length > 0 && activite &&
                                        <Link color="inherit" to={`/vente-produits/${secteur}/${activite}`} className={classes.link}>
                                            {_.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name)}
                                        </Link>

                                    }
                                    {
                                        produits.length > 0 && categorie &&
                                        <span className="text-white">
                                            {_.capitalize(produits[0].categorie && produits[0].categorie.name)}
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
                        <title>Résultats de recherche {(
                            activite ? 'de [ ' + _.capitalize(activite) + ' ]' :
                                secteur ? 'de [ ' + _.capitalize(secteur) + ' ]' :
                                    ''
                        ) + (pays ? ' au ' + _.capitalize(pays) : '') + (q ? ' #' + _.capitalize(q) : '')
                        }</title>
                        <meta name="robots" content="noindex, nofollow" />
                        <meta name="googlebot" content="noindex" />
                    </Helmet>
                    {
                        /**
                         * <Typography color="secondary" className="mt-16 flex items-center uppercase" variant="h6">
                         <Icon className="mr-8">search</Icon>
                         <span>Résultats de recherche {(
                             categorie ? 'de [ ' + _.capitalize(categorie) + ' ]' :
                                 activite ? 'de [ ' + _.capitalize(activite) + ' ]' :
                                     secteur ? 'de [ ' + _.capitalize(secteur) + ' ]' :
                                         ''
                         ) + (pays ? ' au ' + _.capitalize(pays) : '') + (q ? ' #' + _.capitalize(q) : '')
                         }</span>
                     </Typography>
                         */
                    }


                    <Paper className="p-32 w-full my-16 text-center">
                        <img className={classes.img} alt="product not found" src="assets/images/product_not_found.jpg" />
                        <Typography variant="h6" className="mb-16 uppercase" >

                            Oups! Nous n'avons pas pu trouver de résultats pour votre recherche
                        </Typography>

                        <Typography variant="h6" className="mb-16 uppercase" color="primary">
                            Le produit sera affiché prochainement
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
                produits.length > 0 &&
                <Helmet>
                    <title>{_.truncate('Vente de produits ' + (
                        categorie ? _.capitalize(produits[0].categorie && produits[0].categorie.name) : (
                            activite ? _.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name) :
                                secteur ? _.capitalize(produits[0].secteur && produits[0].secteur.name) : ''
                        )
                    ) + (pays ? _.capitalize(produits[0].pays && ' au ' + produits[0].pays.name) : '')
                        , { 'length': 70, 'separator': ' ' })}</title>
                    {
                        q && <meta property="keyword" content={q} />
                    }
                    <meta name="description" content={_.truncate('Les achats industriels la place de marché numéro 1 au maroc, trouver vos produits dans ' + (produits[0].categorie && produits[0].categorie.name) +
                        ', ' + (produits[0].sousSecteurs && produits[0].sousSecteurs.name) + ', ' + (produits[0].secteur && produits[0].secteur.name), { 'length': 160, 'separator': ' ' })} />
                    <meta property="og:title" content={_.truncate('Vente de produits ' + (
                        categorie ? _.capitalize(produits[0].categorie && produits[0].categorie.name) : (
                            activite ? _.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name) :
                                secteur ? _.capitalize(produits[0].secteur && produits[0].secteur.name) : ''
                        )
                    ) + (pays ? _.capitalize(produits[0].pays && ' au ' + produits[0].pays.name) : ''), { 'length': 70, 'separator': ' ' })} />
                    <meta property="og:description" content={_.truncate('Les achats industriels la place de marché numéro 1 au maroc, trouver vos produits dans ' + (produits[0].categorie && produits[0].categorie.name) +
                        ', ' + (produits[0].sousSecteurs && produits[0].sousSecteurs.name) + ', ' + (produits[0].secteur && produits[0].secteur.name), { 'length': 160, 'separator': ' ' })} />
                    <meta property="twitter:title" content={_.truncate('Vente de produits ' + (
                        categorie ? _.capitalize(produits[0].categorie && produits[0].categorie.name) : (
                            activite ? _.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name) :
                                secteur ? _.capitalize(produits[0].secteur && produits[0].secteur.name) : ''
                        )
                    ) + (pays ? _.capitalize(produits[0].pays && ' au ' + produits[0].pays.name) : ''), { 'length': 70, 'separator': ' ' })} />
                    <meta property="twitter:description" content={_.truncate('Les achats industriels la place de marché numéro 1 au maroc, trouver vos produits dans ' + (produits[0].categorie && produits[0].categorie.name) +
                        ', ' + (produits[0].sousSecteurs && produits[0].sousSecteurs.name) + ', ' + (produits[0].secteur && produits[0].secteur.name), { 'length': 160, 'separator': ' ' })} />
                </Helmet>

            }

            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container
                    classes={{
                        'spacing-xs-2': classes.grid
                    }}
                    spacing={2}
                    className="max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs}>
                                <Link color="inherit" to="/" className={classes.link}>
                                    <HomeIcon className={classes.icon} />
                                    Accueil
                                </Link>
                                {
                                    produits.length > 0 && secteur &&
                                    <Link color="inherit" to={`/vente-produits/${secteur}`} className={classes.link}>
                                        {_.capitalize(produits[0].secteur && produits[0].secteur.name)}
                                    </Link>

                                }
                                {
                                    produits.length > 0 && activite &&
                                    <Link color="inherit" to={`/vente-produits/${secteur}/${activite}`} className={classes.link}>
                                        {_.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name)}
                                    </Link>

                                }
                                {
                                    produits.length > 0 && categorie &&
                                    <span className="text-white">
                                        {_.capitalize(produits[0].categorie && produits[0].categorie.name)}
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

            <Grid container
                classes={{
                    'spacing-xs-2': classes.grid
                }}
                spacing={2}
                className="max-w-2xl  mx-auto sm:px-16 pt-24 items-center">
                <Grid item sm={8} xs={12}>
                    <Typography variant="h1" className="text-24 font-bold">
                        {
                            produits.length > 0 ? 'Vente de produits ' + (
                                categorie ? _.capitalize(produits[0].categorie && produits[0].categorie.name) : (
                                    activite ? _.capitalize(produits[0].sousSecteurs && produits[0].sousSecteurs.name) :
                                        secteur ? _.capitalize(produits[0].secteur && produits[0].secteur.name) : ''
                                )
                            ) + (pays ? _.capitalize(produits[0].pays && ' au ' + produits[0].pays.name) : '')
                                : ''
                        }

                    </Typography>
                </Grid>
                <Grid item sm={4} xs={12} className="flex items-center justify-between ">
                    <Typography className="text-13 mr-16">Voir résultats de:</Typography>
                    <Button disabled size="small" className={classes.button}>
                        Produits
                    </Button>
                    |
                    <Button size="small" onClick={handleUrlFournisseurs} color="secondary" className={classes.button}>
                        fournisseurs
                    </Button>
                </Grid>
            </Grid>
            <Grid container
                classes={{
                    'spacing-xs-2': classes.grid
                }}
                spacing={2}
                className="max-w-2xl mx-auto py-24 sm:px-16 items-start">

                <Grid item sm={4} md={3} xs={12} className="sticky top-0 order-last sm:order-first">
                    <SideBareSearch  {...props} />
                </Grid>
                <Grid item sm={8} md={9} xs={12}>
                    <ContentList />
                </Grid>
            </Grid>
            <DemandeDevisDialog />
        </div>


    )
}

export default withReducer('produitsApp', reducer)(ProduitsApp);