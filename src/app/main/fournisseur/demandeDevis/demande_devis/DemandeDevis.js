import React, {  useEffect } from 'react';
import {  Tab, Tabs, InputAdornment, Icon, Typography, LinearProgress, Grid,  Divider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded,  TextFieldFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    demandeDevisImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: red[400],
        opacity: 0
    },
    demandeDevisImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    select: {
        zIndex: 999,
    },
    demandeDevisImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $demandeDevisImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $demandeDevisImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $demandeDevisImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function DemandeDevis(props) {

    const dispatch = useDispatch();
    const demandeDevis = useSelector(({ demandeDevisFrsApp }) => demandeDevisFrsApp.demandeDevis);
    const { form, setForm } = useForm();

    const classes = useStyles(props);
    const tabValue = 0;

   

    useEffect(() => {
        function updateDemandeState() {
            const params = props.match.params;
            const { demandeId } = params;
            dispatch(Actions.getDemande(demandeId));
        }

        updateDemandeState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (demandeDevis.data && !form) ||
            (demandeDevis.data && form && demandeDevis.data.id !== form.id)
        ) {
            setForm({ ...demandeDevis.data });

        }
    }, [form, demandeDevis.data, setForm]);



    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !demandeDevis.loading
                    ?

                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/product_devis" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.produit ? 'Référence de produit :' + form.produit.reference : ''}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Détails de la demande</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                    )
                    :
                    ''
            }
            contentToolbar={
                demandeDevis.loading ?
                    <div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>
                    :
                    <Tabs
                        value={tabValue}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Détails de la demande de devis" />

                    </Tabs>

            }
            content={
                !demandeDevis.loading ?

                    form && (
                        <div className="p-10  sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                                (
                                    <Formsy
                                        className="flex pt-10 flex-col ">

                                        {/* Information produit & fournisseur*/}
                                        <Grid container spacing={3} className="mb-5">


                                           
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Réf. Produit"
                                                    id="reference"
                                                    name="reference"
                                                    value={form.produit ? form.produit.reference : ''}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Titre de Produit"
                                                    id="reference"
                                                    name="reference"
                                                    value={form.produit ? form.produit.titre : ''}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Quantité"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={form.quantity ? form.quantity : ''}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth

                                                />

                                            </Grid>

                                        </Grid>

                                        <Divider />

                                        {/* Information demandeDevisur*/}

                                        <Grid container spacing={3} className="mt-5 mb-5">

                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Raison sociale"
                                                    id="societe"
                                                    name="societe"
                                                    value={form.societe}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    type="text"
                                                    name="contact"
                                                    value={form.contact}
                                                    label="NOM & Prénom"                                                   
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    type="text"
                                                    name="email"
                                                    label="Email"
                                                    validations="isEmail"
                                                    value={form.email}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    value={form.phone}
                                                    type="text"
                                                    name="phone"
                                                    label="Téléphone"                                                   
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextFieldFormsy
                                                    type="text"
                                                    name="adresse"
                                                    value={form.adresse}
                                                    label="Adresse"                                                
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    fullWidth

                                                />

                                            </Grid>
                                        </Grid>

                                        <TextFieldFormsy
                                            className="mb-16  w-full"
                                            type="text"
                                            name="message"
                                            value={form.message}
                                            label="Message"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            multiline
                                            rows="4"

                                        />
                                    </Formsy>
                                )}

                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('demandeDevisFrsApp', reducer)(DemandeDevis);
