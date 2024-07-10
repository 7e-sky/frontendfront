import React, { useRef, useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Card, Grid, CardContent, InputAdornment, Icon, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import SelectReactFormsy from '@fuse/components/formsy/SelectReactFormsy';
import StepConnector from '@material-ui/core/StepConnector';
import PropTypes from 'prop-types';
import DomainIcon from '@material-ui/icons/Domain';
import SettingsIcon from '@material-ui/icons/Settings';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { Helmet } from "react-helmet";

/**=============== ACHETEUR INFO SOCIETE ======================= */

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 675,
        maxWidth: 675,

    },
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    labelBold: {
        fontWeight: 'bold!important'
    }
}));
const defaultFormState = {
    step4: '',
    ville: '',
    secteur: '',
    adresse1: '',
    adresse2: '',
    website: '',
    fix: '',
    ice: '',
    description: '',
    autreVille: '',
    autreCurrency: '',
};
const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(45deg, #5AFF15 30%, #00B712 90%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(45deg, #5AFF15 30%, #00B712 90%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(45deg, #5AFF15 30%, #00B712 90%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient(45deg, #5AFF15 30%, #00B712 90%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Icon>person_add</Icon>,
        2: <DomainIcon />,
        3: <SettingsIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

function getSteps() {
    return ['Inscription', 'Informations de la société'];
}

function Step4App(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const steps = getSteps();
    const user = useSelector(({ auth }) => auth.user);

    const [isFormValid, setIsFormValid] = useState(false);
    const [showIce, setShowIce] = useState(false);
    const [showAutreVille, setShowAutreVille] = useState(false);
    const [showAutreCurrency, setShowAutreCurrency] = useState(false);
    const formRef = useRef(null);

    const pays = useSelector(({ step4App }) => step4App.step4.pays);
    const villes = useSelector(({ step4App }) => step4App.step4.villes);
    const currencies = useSelector(({ step4App }) => step4App.step4.currencies);
    const step4 = useSelector(({ step4App }) => step4App.step4);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    useEffect(() => {
        dispatch(Actions.getPays());
        dispatch(Actions.getSecteurs());
        dispatch(Actions.getCurrency());
    }, [dispatch]);

    useEffect(() => {
        if (step4.error && (step4.error.pays || step4.error.ville || step4.error.adresse1 || step4.error.adresse2 || step4.error.website || step4.error.fix || step4.error.ice || step4.error.description)) {
            formRef.current.updateInputsWithError({
                ...step4.error
            });
            disableButton();
        }
    }, [step4.error]);



    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        dispatch(Actions.setStep4(model, user.id, props.history));
    }



    function handleChipChange(value, name) {

        if (name === 'ville' || name === 'secteur' || name === 'currency') {
            setForm(_.set({ ...form }, name, value));
            if (name === 'ville' && value.label === 'Autre') {
                setShowAutreVille(true)
            }
            if (name === 'ville' && value.label !== 'Autre') {
                setShowAutreVille(false)
            }
            if (name === 'currency' && value.label === 'Autre') {
                setShowAutreCurrency(true)
            }
            if (name === 'currency' && value.label !== 'Autre') {
                setShowAutreCurrency(false)
            }
        }
        else {
            setForm(_.set({ ...form }, name, value));
            if (value.value) {
                dispatch(Actions.getVilles(value.value));
            }
            setShowAutreVille(false)
            if (value.label === 'Maroc') {
                setShowIce(true)
            }
            else {
                setShowIce(false)
            }
        }

    }


    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>
            <Helmet>
                <title>Inscription Acheteur | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <div className="flex flex-col items-center justify-center w-full">


                <FuseAnimate animation="transition.expandIn">

                    <Card className={classes.card}>

                        <CardContent >


                            <div >

                                <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel classes={{
                                                label: 'font-bold',
                                                alternativeLabel: classes.labelBold
                                            }} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <div>

                                    <div className="w-full">
                                        <Formsy
                                            onValidSubmit={handleSubmit}
                                            onValid={enableButton}
                                            onInvalid={disableButton}
                                            ref={formRef}
                                            className="flex flex-col justify-center w-full"
                                        >

                                            <Grid container spacing={3} className=" min-w-450 max-w-450">


                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="secteur"
                                                        name="secteur"
                                                        value={
                                                            form.secteur
                                                        }
                                                        placeholder="Sélectionner votre secteur d'activité"
                                                        textFieldProps={{
                                                            label: 'Secteur d\'activité',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined',
                                                            required: true
                                                        }}
                                                        className="mb-16"
                                                        options={step4.secteurs}
                                                        onChange={(value) => handleChipChange(value, 'secteur')}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="currency"
                                                        name="currency"
                                                        value={
                                                            form.currency
                                                        }
                                                        placeholder="Sélectionner votre devise locale"
                                                        textFieldProps={{
                                                            label: 'Devise',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined',
                                                            required: true
                                                        }}
                                                        className="mb-16"
                                                        options={currencies}
                                                        onChange={(value) => handleChipChange(value, 'currency')}
                                                        required
                                                    />
                                                    {
                                                        showAutreCurrency ?
                                                            <TextFieldFormsy
                                                                className="mb-16 w-full"
                                                                type="text"
                                                                name="autreCurrency"
                                                                value={form.autreCurrency}
                                                                onChange={handleChange}
                                                                label="Autre Devise"
                                                                autoComplete="currency"
                                                                validations={{
                                                                    minLength: 2,
                                                                    maxLength: 5,

                                                                }}
                                                                validationErrors={{
                                                                    minLength: 'La longueur minimale de caractère est 2',
                                                                    maxLength: 'La longueur maximale de caractère est 5',
                                                                }}
                                                                variant="outlined"
                                                                required
                                                            />
                                                            :
                                                            ''
                                                    }
                                                </Grid>


                                            </Grid>

                                            <Grid container spacing={3} className=" min-w-450 max-w-450">


                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="pays"
                                                        name="pays"
                                                        value={
                                                            form.pays
                                                        }
                                                        placeholder="Sélectionner un pays"
                                                        textFieldProps={{
                                                            label: 'Pays',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined',
                                                            required: true
                                                        }}

                                                        className="mb-16"
                                                        options={pays}
                                                        onChange={(value) => handleChipChange(value, 'pays')}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="ville"
                                                        name="ville"
                                                        value={
                                                            form.ville
                                                        }
                                                        placeholder="Sélectionner une ville"
                                                        textFieldProps={{
                                                            label: 'Ville',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined',
                                                            required: true
                                                        }}
                                                        className="mb-16"
                                                        options={villes}
                                                        isLoading={step4.loadingVille}
                                                        onChange={(value) => handleChipChange(value, 'ville')}
                                                        required
                                                    />
                                                </Grid>


                                            </Grid>
                                            {
                                                showAutreVille ?
                                                    <TextFieldFormsy
                                                        className="mb-16 w-full"
                                                        type="text"
                                                        name="autreVille"
                                                        value={form.autreVille}
                                                        onChange={handleChange}
                                                        label="Autre ville"
                                                        autoComplete="ville"
                                                        validations={{
                                                            minLength: 2,
                                                            maxLength: 50,

                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 2',
                                                            maxLength: 'La longueur maximale de caractère est 50',
                                                        }}
                                                        variant="outlined"
                                                        required
                                                    />
                                                    :
                                                    ''
                                            }
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="adresse1"
                                                        value={form.adresse1}
                                                        onChange={handleChange}
                                                        autoComplete="adresse"
                                                        label="Adresse 1"
                                                        validations={{
                                                            minLength: 10,
                                                            maxLength: 150,
                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 10',
                                                            maxLength: 'La longueur maximale de caractère est 150',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                        required
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="adresse2"
                                                        value={form.adresse2}
                                                        onChange={handleChange}
                                                        autoComplete="adresse"
                                                        label="Adresse 2"
                                                        validations={{
                                                            minLength: 10,
                                                            maxLength: 150,

                                                        }}
                                                        validationErrors={{
                                                            maxLength: 'La longueur maximale de caractère est 150',
                                                            minLength: 'La longueur minimale de caractère est 10',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={3} >
                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="website"
                                                        value={form.website}
                                                        onChange={handleChange}
                                                        autoComplete="website"
                                                        label="Site Web"
                                                        validations="isUrl"
                                                        validationErrors={{
                                                            isUrl: 'Exemple : http://www.exemple.com',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">language</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="fix"
                                                        value={form.fix}
                                                        onChange={handleChange}
                                                        label="Fixe"
                                                        autoComplete="fix"
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
                                                    />
                                                </Grid>
                                            </Grid>

                                            {
                                                showIce ?
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="ice"
                                                        value={form.ice}
                                                        onChange={handleChange}
                                                        label="ICE"
                                                        autoComplete="ice"

                                                        validations={{
                                                            minLength: 15,
                                                            maxLength: 15,
                                                            isNumeric: "isNumeric",
                                                            matchRegexp: /^(?!.*?(\w)\1{14}).*$/,

                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 15',
                                                            maxLength: 'La longueur maximale de caractère est 15',
                                                            isNumeric: 'Cette valeur doit être numérique. ',
                                                            matchRegexp: 'ICE non valid. ',

                                                        }}

                                                        variant="outlined"
                                                        required
                                                    />
                                                    :
                                                    ''
                                            }


                                            <TextFieldFormsy
                                                className="mb-16  w-full"
                                                type="text"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                label="Présentation"
                                                autoComplete="description"
                                                validations={{
                                                    minLength: 10,
                                                }}
                                                validationErrors={{
                                                    minLength: 'La longueur minimale de caractère est 10',
                                                }}

                                                variant="outlined"
                                                multiline
                                                rows="8"

                                            />
                                            <Typography variant="caption" className="flex items-center mb-16">
                                                <span className="mr-4 text-red">*</span> Champs obligatoires
                                            </Typography>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="w-full mx-auto mt-16 normal-case"
                                                aria-label="Suivant"
                                                disabled={!isFormValid || step4.loading}
                                                value="legacy"
                                            >
                                                Terminer
                                                {step4.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                            </Button>

                                        </Formsy>

                                    </div>


                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withReducer('step4App', reducer)(Step4App);