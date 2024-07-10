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

function ContactFournisseurDialog(props) {
    const dispatch = useDispatch();
    const fournisseur = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur);
    const contactFournisseurDialog = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.contactFournisseurDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {

            /**
             * Dialog type: 'new'
             */
            if (contactFournisseurDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...contactFournisseurDialog.data,
                });
            }
        },
        [contactFournisseurDialog.data, contactFournisseurDialog.type, setForm],
    );

    // Effect handle errors
    useEffect(() => {
        if (fournisseur.error && (fournisseur.error.contact || fournisseur.error.phone || fournisseur.error.email || fournisseur.error.message)) {
            formRef.current.updateInputsWithError({
                ...fournisseur.error
            });
            disableButton();
        }
        return () => {
            dispatch(Actions.cleanError())
        }

    }, [fournisseur.error, dispatch]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (contactFournisseurDialog.props.open) {
            initDialog();
        }

    }, [contactFournisseurDialog.props.open, initDialog]);



    function closeComposeDialog() {
        dispatch(Actions.closeNewContactFournisseurDialog());
    }



    function handleSubmit(model) {
        //event.preventDefault();
        if (contactFournisseurDialog.type === 'new') {
            dispatch(Actions.addMessage(model, contactFournisseurDialog.data));
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
            {...contactFournisseurDialog.props}
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">perm_identity</Icon></InputAdornment>
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
                        disabled={!isFormValid || fournisseur.loadingsContact}
                    >
                        Envoyer
                        {fournisseur.loadingsContact && <CircularProgress size={24} />}
                    </Button>
                    <p className="pr-16">* Champs obligatoires</p>
                </DialogActions>

            </Formsy>
        </Dialog >
    );
}

export default ContactFournisseurDialog;
