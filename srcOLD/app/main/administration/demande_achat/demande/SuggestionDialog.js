import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, CircularProgress, IconButton, Typography, Toolbar, AppBar, DialogTitle, DialogContentText } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import SelectReactFormsy from '@fuse/components/formsy/SelectReactFormsy';
import _ from '@lodash';
import { makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';

const defaultFormState = {
    name: '',
};
const useStyles = makeStyles(theme => ({

    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}));
function SuggestionDialog(props) {
    const classes = useStyles(props);

    const dispatch = useDispatch();
    const suggestionDialog = useSelector(({ demandesAdminApp }) => demandesAdminApp.demande.suggestionsDialog);
    const secteurs = useSelector(({ demandesAdminApp }) => demandesAdminApp.demande.secteurs);
    const sousSecteursAdmin = useSelector(({ demandesAdminApp }) => demandesAdminApp.demande.sousSecteursAdmin);
    const loadingSousSecteursAdmin = useSelector(({ demandesAdminApp }) => demandesAdminApp.demande.loadingSousSecteursAdmin);
    const requestSaveProduit = useSelector(({ demandesAdminApp }) => demandesAdminApp.demande.requestSaveProduit);

    const { form, handleChange, setForm } = useForm(defaultFormState);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const [secteur, setSecteur] = useState(null);
    const [sousSecteur, setSousSecteur] = useState(null);


    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (suggestionDialog.type === 'edit' && suggestionDialog.data) {
                setForm({ ...suggestionDialog.data });
            }
        },
        [suggestionDialog.data, suggestionDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (suggestionDialog.props.open) {
            initDialog();
        }

    }, [suggestionDialog.props.open, initDialog]);

    function closeComposeDialog() {
        suggestionDialog.type === 'edit' &&
            dispatch(Actions.closeSuggestionDialog());
    }

    function handleSubmit(model) {
        dispatch(Actions.saveProduit(model));
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function handleChipChange(value, name) {
        //setForm(_.set({...form}, name, value.map(item => item.value)));
        if (name === 'secteur') {
            if (value.value) {
                dispatch(Actions.getSousSecteursAdmin(value.value));
                setSousSecteur(null)
                setSecteur(value)
            }
        }
        if (name === 'sousSecteur') {
            if (value.value) {
                setSousSecteur(value)
            }
        }
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...suggestionDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {suggestionDialog.type === 'edit' && 'Nouvelle suggestion'}
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

                        <SelectReactFormsy

                            id="secteur"
                            name="secteur"
                            value={secteur}
                            className="MuiFormControl-fullWidth MuiTextField-root mb-24"
                            onChange={(value) => handleChipChange(value, 'secteur')}
                            placeholder="Sélectionner un secteur"
                            textFieldProps={{
                                label: 'Secteurs',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined',
                                required: true

                            }}
                            options={secteurs}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <SelectReactFormsy
                            id="sousSecteurs"
                            name="sousSecteurs"
                            value={sousSecteur}
                            className="MuiFormControl-fullWidth MuiTextField-root  mb-24"
                            onChange={(value) => handleChipChange(value, 'sousSecteur')}
                            placeholder="Sélectionner une activité"
                            textFieldProps={{
                                label: 'Activités',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined',
                                required: true


                            }}
                            isLoading={loadingSousSecteursAdmin}
                            options={sousSecteursAdmin}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <TextFieldFormsy
                            label="Produit"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4'
                            }}
                            required
                            fullWidth
                        />
                    </div>


                </DialogContent>

                {suggestionDialog.type === 'edit' && (
                    <DialogActions className="pl-16">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={closeComposeDialog}
                            disabled={requestSaveProduit}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid || !secteur || !sousSecteur || requestSaveProduit}
                        >
                            Ajouter
                            {requestSaveProduit && <CircularProgress size={24} className={classes.buttonProgress} />}

                        </Button>
                    </DialogActions>
                )}
            </Formsy>
        </Dialog>
    );
}

export default SuggestionDialog;
