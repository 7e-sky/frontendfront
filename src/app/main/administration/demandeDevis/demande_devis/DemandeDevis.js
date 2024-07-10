import React, { useRef, useEffect, useState } from 'react';
import { Button, Tab, Tabs, InputAdornment, Icon, Typography, LinearProgress, Grid, CircularProgress, Divider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, TextFieldFormsy, CheckboxFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
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
    const demandeDevis = useSelector(({ demandeDevisApp }) => demandeDevisApp.demandeDevis);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const { form, handleChange, setForm } = useForm();

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);



    useEffect(() => {
        if (demandeDevis.error && (demandeDevis.error.reference || demandeDevis.error.statut || demandeDevis.error.motifRejet || demandeDevis.error.description || demandeDevis.error.descriptionEn || demandeDevis.error.descriptionEs || demandeDevis.error.dateExpiration || demandeDevis.error.isPublic || demandeDevis.error.isAnonyme || demandeDevis.error.sousSecteurs || demandeDevis.error.budget)) {
            formRef.current.updateInputsWithError({
                ...demandeDevis.error
            });
            disableButton();
            demandeDevis.error = null;
        }
    }, [demandeDevis.error]);

    useEffect(() => {
        if (demandeDevis.success) {

            demandeDevis.success = false;
            demandeDevis.data = null;
            demandeDevis.error = null;
            props.history.push('/demandes_devis');
        }
    }, [demandeDevis.success]);


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

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }


    function handleCheckBoxChange(e, name) {

        setForm(_.set({ ...form }, name, e.target.checked));
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit() {

        dispatch(Actions.putDemande(form, form.id));

    }

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
                                    <Typography className="normal-case flex items-center sm:mb-12" role="button" onClick={() => props.history.goBack()} color="inherit">
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
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isFormValid || demandeDevis.loading}
                                    onClick={() => handleSubmit()}
                                >
                                    Sauvegarder
                                    {demandeDevis.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </FuseAnimate>

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
                        onChange={handleChangeTab}
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
                                        onValidSubmit={handleSubmit}
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                        ref={formRef}
                                        className="flex pt-10 flex-col ">

                                        {/* Information produit & fournisseur*/}
                                        <Grid container spacing={3} className="mb-5">


                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Fournisseur"
                                                    id="fournisseur"
                                                    name="fournisseur"
                                                    value={form.fournisseur ? form.fournisseur.societe : ''}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    label="Réf. Produit"
                                                    id="reference"
                                                    name="reference"
                                                    value={form.produit ? form.produit.reference : ''}
                                                    variant="outlined"
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
                                                    variant="outlined"
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
                                                    autoFocus
                                                    id="societe"
                                                    name="societe"
                                                    value={form.societe}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    validations={{
                                                        matchRegexp: /^[a-z]|([a-z][0-9])|([0-9][a-z])|([a-z][0-9][a-z])+$/i,
                                                        minLength: 2,
                                                        maxLength: 40

                                                    }}
                                                    validationErrors={{
                                                        minLength: 'Raison sociale doit dépasser 2 caractères alphanumériques',
                                                        maxLength: 'Raison sociale ne peut dépasser 40 caractères alphanumériques',
                                                        matchRegexp: 'Raison sociale doit contenir des caractères alphanumériques'
                                                    }}
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    type="text"
                                                    name="contact"
                                                    value={form.contact}
                                                    onChange={handleChange}
                                                    label="NOM & Prénom"
                                                    validations={{
                                                        minLength: 4
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 4'
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    required
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
                                                    onChange={handleChange}
                                                    validationErrors={{
                                                        isEmail: 'Veuillez saisir un e-mail valide'
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>

                                                <TextFieldFormsy
                                                    className="mb-16"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="phone"
                                                    label="Téléphone"
                                                    validations={{
                                                        minLength: 10,
                                                        maxLength: 13,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 10',
                                                        maxLength: 'La longueur maximale de caractère est 13'
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextFieldFormsy
                                                    type="text"
                                                    name="adresse"
                                                    value={form.adresse}
                                                    onChange={handleChange}
                                                    autoComplete="adresse"
                                                    label="Adresse"
                                                    validations={{
                                                        minLength: 10,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 10',
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    required
                                                    fullWidth

                                                />

                                            </Grid>



                                        </Grid>


                                        <TextFieldFormsy
                                            className="mb-16  w-full"
                                            type="text"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            label="Message"
                                            validations={{
                                                minLength: 10,
                                            }}
                                            validationErrors={{
                                                minLength: 'La longueur minimale de caractère est 10',
                                            }}

                                            variant="outlined"
                                            multiline
                                            rows="4"
                                            required

                                        />


                                        <Grid container spacing={3} >


                                            <Grid item xs={12} sm={6}>
                                                <CheckboxFormsy
                                                    className="mb-10"
                                                    name="statut"
                                                    onChange={(e) => handleCheckBoxChange(e, 'statut')}
                                                    label="Valider et alerter le fournisseur"
                                                    value={form.statut}
                                                />
                                            </Grid>



                                        </Grid>

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

export default withReducer('demandeDevisApp', reducer)(DemandeDevis);
