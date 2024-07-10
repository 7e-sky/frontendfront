import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography, Toolbar, AppBar, FormControlLabel, Radio } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RadioGroupFormsy, TextFieldFormsy, SelectReactFormsy, CheckboxFormsy } from '@fuse';
import Formsy from 'formsy-react';
import _ from '@lodash';

const defaultFormState = {
    name: '',
};

function CommandesDialog(props) {
    const dispatch = useDispatch();
    const CommandesDialog = useSelector(({ commandesApp }) => commandesApp.commandes.commandesDialog);
    const paiements = useSelector(({ commandesApp }) => commandesApp.commandes.paiements);
    const parametres = useSelector(({ commandesApp }) => commandesApp.commandes.parametres);



    const { form, handleChange, setForm } = useForm(defaultFormState);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (CommandesDialog.type === 'edit' && CommandesDialog.data) {
                CommandesDialog.data.prix= CommandesDialog.data.nbrJeton*100;
                setForm({ ...CommandesDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (CommandesDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...CommandesDialog.data,
                });
            }
        },
        [CommandesDialog.data, CommandesDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (CommandesDialog.props.open) {
            initDialog();
        }

    }, [CommandesDialog.props.open, initDialog]);



    function closeComposeDialog() {
        CommandesDialog.type === 'edit' ? dispatch(Actions.closeEditCommandesDialog()) : dispatch(Actions.closeNewCommandesDialog());
    }



    function handleSubmit() {
        //event.preventDefault();

        if (CommandesDialog.type === 'edit') {
            dispatch(Actions.addCommande(form,parametres));
        }
      
        closeComposeDialog();
    }

    function handleChipChange(value, name) {
        setForm(_.set({ ...form }, name, value));
    }
/*
    function handleRadioChange(e) {

        setForm(_.set({ ...form }, 'nbrJeton', parseInt(e.target.value)));
    }*/
    
    function handleCheckBoxChange(e, name) {

        setForm(_.set({ ...form }, name, e.target.checked));
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
            {...CommandesDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {CommandesDialog.type === 'new' ? 'Nouvelle Commande' : 'Editer Commande'}
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
                            id="reference"
                            name="reference"
                            label="Fournisseur"
                            value={form.fournisseur ? form.fournisseur.societe : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />

                    </div>

                    <div className="flex">

                        <RadioGroupFormsy
                            className="inline"
                            name="nbrJeton"
                            label="Nombre de jetons"
                        >
                            <FormControlLabel value="5" disabled checked={form.nbrJeton === 5} control={<Radio />} label="5" />
                            <FormControlLabel value="10" disabled checked={form.nbrJeton === 10} control={<Radio />} label="10" />
                            <FormControlLabel value="20" disabled checked={form.nbrJeton === 20} control={<Radio />} label="20" />

                        </RadioGroupFormsy>

                    </div>
                    <div className="flex">


                        <TextFieldFormsy
                            className="mb-24 mt-24"
                            type="number"
                            step="any"
                            label="Prix"
                            id="prix"
                            name="prix"
                            min="0"
                            value={String(form.nbrJeton*100)}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ min: "0", step: "any" }}
                            fullWidth
                            required
                        />

                    </div>
                    <div className="flex">


                        <SelectReactFormsy

                            id="paiement"
                            name="paiement"
                            className="MuiFormControl-fullWidth MuiTextField-root mb-24 z-9999"
                            value={

                                form.paiement


                            }
                            onChange={(value) => handleChipChange(value, 'paiement')}
                            textFieldProps={{
                                label: 'Choisissez le mode de paiement',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined'
                            }}
                            options={paiements}
                            fullWidth
                            required
                        />

                    </div>
                    <div className="flex">


                        <CheckboxFormsy
                            className="mb-10"
                            name="isPayed"
                            onChange={(e) => handleCheckBoxChange(e, 'isPayed')}
                            label="Confirmer le paiement de cette entreprise"
                        />

                    </div>


                </DialogContent>

                {CommandesDialog.type === 'new' ? (
                   ''
                ) : (
                        <DialogActions className="justify-between pl-16">
                            {
                                form.isUse ? '' :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={!isFormValid}
                                    >
                                        Mettre à jour
                                    </Button>
                            }


                        </DialogActions>
                    )}
            </Formsy>
        </Dialog>
    );
}

export default CommandesDialog;
