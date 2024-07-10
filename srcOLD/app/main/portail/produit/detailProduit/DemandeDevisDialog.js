import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar, InputAdornment, CircularProgress } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import Link from '@material-ui/core/Link';

const defaultFormState = {
    contact: '',
};

function DemandeDevisDialog(props) {
    const dispatch = useDispatch();
    const demandeDevis = useSelector(({ produitsApp }) => produitsApp.detailProduit);
    const demandeDevisDialog = useSelector(({ produitsApp }) => produitsApp.detailProduit.demandeDevisDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {

            /**
             * Dialog type: 'new'
             */
            if (demandeDevisDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...demandeDevisDialog.data,
                });
            }
        },
        [demandeDevisDialog.data, demandeDevisDialog.type, setForm],
    );

    // Effect handle errors
    useEffect(() => {
        if (demandeDevis.error && (demandeDevis.error.contact || demandeDevis.error.societe || demandeDevis.error.phone || demandeDevis.error.email || demandeDevis.error.message || demandeDevis.error.quantity || demandeDevis.error.adresse)) {
            formRef.current.updateInputsWithError({
                ...demandeDevis.error
            });
            disableButton();
        }
        return () => {
            dispatch(Actions.cleanError())
        }

    }, [demandeDevis.error, dispatch]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (demandeDevisDialog.props.open) {
            initDialog();
        }

    }, [demandeDevisDialog.props.open, initDialog]);



    function closeComposeDialog() {
        dispatch(Actions.closeNewDemandeDevisDialog());
    }



    function handleSubmit(model) {
        //event.preventDefault();

        if (demandeDevisDialog.type === 'new') {
            dispatch(Actions.addDemandeDevis(model, demandeDevisDialog.data));
        }

    }



    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...demandeDevisDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        ENVOYEZ UN MESSAGE
                    </Typography>
                </Toolbar>

            </AppBar>
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>

                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-24"
                            label="Nom Contact"
                            autoFocus
                            id="contact"
                            name="contact"
                            value={form.contact}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4,
                                maxLength: 100

                            }}
                            validationErrors={{
                                maxLength: 'La longueur minimale de caractère est 100',
                                minLength: 'La longueur minimale des caractères est de 4'
                            }}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">

                        <TextFieldFormsy
                            className="mb-24"
                            label="Raison sociale"
                            id="societe"
                            autoComplete="Raison sociale"
                            name="societe"
                            value={form.societe}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                matchRegexp: /^[a-z]|([a-z][0-9])|([0-9][a-z])|([a-z][0-9][a-z])+$/i,
                                minLength: 2,
                                maxLength: 50

                            }}
                            validationErrors={{
                                minLength: 'Raison sociale doit dépasser 2 caractères alphanumériques',
                                maxLength: 'Raison sociale ne peut dépasser 50 caractères alphanumériques',
                                matchRegexp: 'Raison sociale doit contenir des caractères alphanumériques'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">work_outline</Icon></InputAdornment>
                            }}
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-24"
                            value={form.phone}
                            onChange={handleChange}
                            type="text"
                            autoComplete="phone"
                            id="phone"
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
                    </div>

                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-24"
                            type="text"
                            autoComplete="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            label="Email"
                            validations="isEmail"
                            validationErrors={{
                                isEmail: 'Veuillez saisir un e-mail valide'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-24"
                            type="text"
                            name="adresse"
                            value={form.adresse}
                            onChange={handleChange}
                            autoComplete="Adresse"
                            label="Adresse"
                            validations={{
                                maxLength: 100,
                                minLength: 10,
                            }}
                            validationErrors={{
                                maxLength: 'La longueur maximale de caractère est 100',
                                minLength: 'La longueur minimale de caractère est 10',
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            fullWidth
                            required

                        />
                    </div>
                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-24"
                            type="number"
                            step="1"
                            label="Quantité souhaitée"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={form.quantity}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ min: "1", step: "1" }}
                            fullWidth
                        />

                    </div>
                    <div className="flex">
                        <TextFieldFormsy
                            className="mb-16  w-full"
                            type="text"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Fournissez des informations pertinentes pour obtenir un devis adapté à vos besoins"
                            label="Message"
                            autoComplete="message"
                            validations={{
                                minLength: 10,
                                maxLength: 1000,
                            }}
                            validationErrors={{
                                maxLength: 'La longueur maximale de caractère est 1000',

                                minLength: 'La longueur minimale de caractère est 10',
                            }}

                            variant="outlined"
                            multiline
                            rows="4"
                            required

                        />
                    </div>

                    {/*Conditions d'utilisation Politique*/}

                    En appuyant sur le bouton <span className="font-bold"> "Envoyer"</span>, vous acceptez les <Link href='/conditions' target="_blank" rel="noreferrer noopener">Conditions d'utilisation</Link> Politique de protection des données


                </DialogContent>


                <DialogActions className="justify-between pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!isFormValid || demandeDevis.loadingsDevis}
                    >
                        Envoyer
                            {demandeDevis.loadingsDevis && <CircularProgress size={24} />}
                    </Button>
                    <p className="pr-16">* Champs obligatoires</p>
                </DialogActions>

            </Formsy>
        </Dialog >
    );
}

export default DemandeDevisDialog;
