import React from 'react';
import { Grid, Card, CardContent, Typography, Icon, Chip, Button, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from "react-content-loader"
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";
import moment from 'moment';
import _ from '@lodash';
import { Link } from 'react-router-dom';
import { InlineShareButtons } from 'sharethis-reactjs';

const ColorButton = withStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'white',
            color: theme.palette.primary.main,
        },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        borderTop: '2px solid ' + theme.palette.secondary.main

    },
    img: {
        width: '70%'
    },
    progress: {
        margin: theme.spacing(2),
    },
    title: {
        fontSize: 30,
        textTransform: 'capitalize'
    },
    chip: {
        padding: 0,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24


    },
    chip2: {
        padding: 0,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24
    },
    grid: {
        marginBottom: '-16px',
        marginTop: '-16px',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& > .MuiGrid-item': {
            padding: '16px'
        }
    },
}));

function DemandeDetail(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const demande = useSelector(({ demandesAchat }) => demandesAchat.demande);
    const user = useSelector(({ auth }) => auth.user);
    /*
        if ( !Demande.data )
        {
            return props.history.push('/')
        }
        if ( Demande.data.length === 0 && !Demande.loading)
        {
            return (
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        Il n'y a pas de Villes!
                    </Typography>
                </div>
            );
        }
    */

    if (demande.data.length === 0 && !demande.loading) {
        return (
            <div className="w-full max-w-2xl mx-auto   min-h-md">
                <Helmet>
                    <title>Demande d'achat introuvable</title>
                    <meta name="robots" content="noindex, nofollow" />
                    <meta name="googlebot" content="noindex" />
                </Helmet>

                <Paper className="p-32 w-full my-6 text-center">
                    <img className={classes.img} alt="product not found" src="assets/images/product_not_found.jpg" />
                    <Typography variant="h6" className="mb-16 uppercase" >

                        Oups! Nous n'avons pas pu trouver cette demande d'achat
                </Typography>

                    <Button variant="outlined" size="small" color="secondary" onClick={() => props.history.goBack()} className={clsx(classes.btn, "mr-8")}>
                        <Icon>chevron_left</Icon> <span className="transition ease-in-out duration-700 ">Retour</span>
                    </Button>

                </Paper>
            </div>
        );
    }

    function handleDownload(fiche) {

        dispatch(Actions.getFile(fiche))

        // window.open(FuseUtils.getUrl() + fiche.url);

    }

    return (
        <>
            {
                demande.data &&
                <Helmet>
                    <title>{_.truncate(demande.data.titre, { 'length': 70, 'separator': ' ' })}</title>
                    <meta name="description" content={_.truncate(demande.data.description, { 'length': 160, 'separator': ' ' })} />
                    <meta property="og:title" content={_.truncate(demande.data.titre, { 'length': 70, 'separator': ' ' })} />
                    <meta property="og:description" content={_.truncate(demande.data.description, { 'length': 160, 'separator': ' ' })} />
                    <meta property="twitter:title" content={_.truncate(demande.data.titre, { 'length': 70, 'separator': ' ' })} />
                    <meta property="twitter:description" content={_.truncate(demande.data.description, { 'length': 160, 'separator': ' ' })} />
                </Helmet>
            }

            <Grid container className={clsx(classes.grid, "max-w-2xl mx-auto py-48 sm:px-16 items-start")}>

                {
                    demande.loading ?
                        <Grid item xs={12} sm={12}>
                            <ContentLoader
                                speed={2}
                                width={480}
                                height={400}
                                viewBox="0 0 480 400"
                            >
                                <rect x="5" y="5" rx="3" ry="3" width="121" height="13" />
                                <rect x="219" y="7" rx="3" ry="3" width="85" height="8" />
                                <rect x="6" y="27" rx="3" ry="3" width="297" height="160" />
                                <rect x="92" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="122" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="153" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="181" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="4" y="228" rx="3" ry="3" width="299" height="18" />
                                <rect x="3" y="255" rx="3" ry="3" width="299" height="82" />
                                <rect x="354" y="4" rx="3" ry="3" width="121" height="20" />
                                <circle cx="373" cy="51" r="20" />
                                <rect x="398" y="35" rx="3" ry="3" width="69" height="13" />
                                <rect x="399" y="57" rx="3" ry="3" width="69" height="7" />
                                <rect x="362" y="79" rx="3" ry="3" width="102" height="23" />
                                <rect x="362" y="109" rx="3" ry="3" width="102" height="23" />
                            </ContentLoader>
                        </Grid>
                        :
                        (
                            demande.data &&
                            (
                                <>
                                    <Grid item xs={12} sm={9} >
                                        <Card className={classes.root}>

                                            <CardContent>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <Typography className={classes.title} component="h1" color="primary">
                                                            {demande.data.titre}
                                                        </Typography>
                                                        <Typography color="textSecondary" >
                                                            {demande.data.reference && 'RFQ-' + demande.data.reference}
                                                        </Typography>
                                                    </div>

                                                </div>
                                                <div className="flex justify-end items-center">
                                                    <div className="mr-8 font-bold">Partager sur :</div>
                                                    <div >
                                                        <InlineShareButtons
                                                            config={{
                                                                alignment: 'center',  // alignment of buttons (left, center, right)
                                                                color: 'social',      // set the color of buttons (social, white)
                                                                enabled: true,        // show/hide buttons (true, false)
                                                                font_size: 16,        // font size for the buttons
                                                                labels: 'null',        // button labels (cta, counts, null)
                                                                language: 'fr',       // which language to use (see LANGUAGES)
                                                                networks: [           // which networks to include (see SHARING NETWORKS)
                                                                    'linkedin',
                                                                    'twitter',
                                                                    'facebook',
                                                                    'email',

                                                                ],
                                                                padding: 8,          // padding within buttons (INTEGER)
                                                                radius: 4,            // the corner radius on each button (INTEGER)
                                                                show_total: false,
                                                                size: 30,             // the size of each button (INTEGER)

                                                                // OPTIONAL PARAMETERS
                                                                //url: 'https://www.sharethis.com', // (defaults to current url)
                                                                // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                                                                description: demande.data.description,       // (defaults to og:description or twitter:description)
                                                                title: demande.data.titre, // (defaults to og:title or twitter:title)
                                                                quote: demande.data.titre
                                                                //message: 'custom email text',     // (only for email sharing)
                                                                //subject: 'custom email subject',  // (only for email sharing)
                                                                //username: 'custom twitter handle' // (only for twitter sharing)
                                                            }}
                                                        />
                                                    </div>
                                                </div>



                                                {
                                                    (user.role === 'ROLE_FOURNISSEUR' || user.role.length === 0)
                                                    &&
                                                    <div className="my-16 p-12 bg-gray-200 text-center " >
                                                        <ColorButton variant="outlined" component={Link} to={"/demandes_prix/" + demande.data.id}>
                                                            Répondre à cette demande
                                                        </ColorButton>
                                                    </div>

                                                }

                                                <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16" >
                                                    Description
                                                </div>

                                                <Typography component="p" className="whitespace-pre-line">
                                                    {
                                                        demande.data.description
                                                    }

                                                </Typography>

                                                <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16">
                                                    Cette demande fait partie de famille de ce produit
                                                </div>
                                                {
                                                    demande.data.categories &&
                                                    demande.data.categories.map((item, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={item.name}
                                                            classes={{
                                                                root: clsx("h-24", props.className),
                                                                label: "pl-4 pr-6 py-4 text-11",
                                                                deleteIcon: "w-16 ml-0",
                                                                ...props.classes
                                                            }}
                                                            variant="outlined"
                                                            className="mr-4"
                                                        />
                                                    ))

                                                }

                                                {
                                                    demande.data.attachements && demande.data.attachements.length > 0 &&
                                                    <>
                                                        <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16 ">
                                                            Pièce(s) jointe(s)
                                                            </div>
                                                        {

                                                            demande.data.attachements.map((item, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    icon={<Icon className="text-16 mr-0">save_alt</Icon>}
                                                                    onClick={() => {
                                                                        handleDownload(item)
                                                                    }}
                                                                    label='Télécharger'
                                                                    classes={{
                                                                        root: clsx("h-24"),
                                                                        label: "pl-4 pr-6 py-4 text-11",
                                                                        deleteIcon: "w-16 ml-0",
                                                                    }}
                                                                    variant="outlined"
                                                                    className="mr-4 cursor-pointer"
                                                                />
                                                            ))
                                                        }

                                                    </>
                                                }


                                            </CardContent>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>

                                        <div className="w-full mb-16 border border-teal-darkest bg-teal-lighter font-bold text-teal text-center text-lg rounded-lg py-32 px-6">
                                            <Typography className="uppercase font-bold" component="h6" >
                                                budget
                                            </Typography>
                                            {demande.data.budget ?
                                                parseFloat(demande.data.budget).toLocaleString(
                                                    'fr', // leave undefined to use the browser's locale,
                                                    // or use a string like 'en-US' to override it.
                                                    { minimumFractionDigits: 2 }
                                                ) +
                                                (demande.data.currency ? ' ' + demande.data.currency.name + ' HT' : '')
                                                :
                                                <small>Veuillez contacter l'Acheteur</small>
                                            }
                                        </div>
                                        <div className="w-full mb-16 border border-gray-darkest bg-gray-light font-bold text-gray text-center text-md rounded-lg py-32 px-6">
                                            <Icon className="text-16 mr-0">location_on</Icon> {demande.data.ville + ', ' + demande.data.pays}
                                        </div>

                                        <table className="table   w-full">

                                            <tbody>
                                                <tr className="bg-gray-200 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">statut</td>
                                                    <td className=" px-8 py-2">{
                                                        moment(demande.data.dateExpiration) >= moment()
                                                            ?
                                                            (demande.data.statut === 1 && <Chip className={classes.chip2} label="En cours" />)
                                                            :
                                                            <Chip className={classes.chip} label="Expirée" />

                                                    }</td>
                                                </tr>
                                                <tr className="bg-gray-400 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">publiée le</td>

                                                    <td className=" px-8 py-2"> {
                                                        moment(demande.data.created).format("DD-MM-YYYY à HH:mm")
                                                    }</td>
                                                </tr>
                                                <tr className="bg-gray-200 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">expire le</td>
                                                    <td className=" px-8 py-2">{
                                                        moment(demande.data.dateExpiration).format("DD-MM-YYYY à HH:mm")
                                                    }</td>
                                                </tr>
                                            </tbody>
                                        </table>



                                    </Grid>
                                </>
                            )
                        )
                }


            </Grid >
        </>
    );
}

export default React.memo(DemandeDetail);
