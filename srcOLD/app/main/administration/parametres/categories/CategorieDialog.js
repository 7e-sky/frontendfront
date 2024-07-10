import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import SelectReactFormsy from '@fuse/components/formsy/SelectReactFormsy';
import _ from '@lodash';
const defaultFormState = {
    name: '',
};

function CategoriesDialog(props) {
    const dispatch = useDispatch();
    const categorieDialog = useSelector(({ categoriesApp }) => categoriesApp.categories.categorieDialog);
    const sousSecteurs = useSelector(({ categoriesApp }) => categoriesApp.categories.sousSecteurs);
    const parametres = useSelector(({ categoriesApp }) => categoriesApp.categories.parametres);

    const { form, handleChange, setForm } = useForm(defaultFormState);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (categorieDialog.type === 'edit' && categorieDialog.data) {

                setForm({ ...categorieDialog.data });
                if (categorieDialog.data.sousSecteurs) {
                    let sousSecteurs = categorieDialog.data.sousSecteurs.map(item => ({
                        value: item['@id'],
                        label: item.name
                    }));
                    setForm(_.set({ ...categorieDialog.data }, 'sousSecteurs', sousSecteurs));
                }

            }

            /**
             * Dialog type: 'new'
             */
            if (categorieDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...categorieDialog.data,
                });
            }
        },
        [categorieDialog.data, categorieDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (categorieDialog.props.open) {
            initDialog();
        }

    }, [categorieDialog.props.open, initDialog]);



    function closeComposeDialog() {
        categorieDialog.type === 'edit' ? dispatch(Actions.closeEditCategoriesDialog()) : dispatch(Actions.closeNewCategoriesDialog());
    }



    function handleSubmit(event) {
        //event.preventDefault();
        if (categorieDialog.type === 'new') {
            dispatch(Actions.addCategorie(form, parametres));
        }
        else {
            dispatch(Actions.updateCategorie(form, parametres));
        }
        closeComposeDialog();
    }

    /* function handleRemove() {
 
         dispatch(Actions.removeCategorie(form, parametres));
         dispatch(Actions.closeDialog())
         closeComposeDialog();
     }*/
    function handleChipChange(value, name) {
        //setForm(_.set({...form}, name, value.map(item => item.value)));
        setForm(_.set({ ...form }, name, value));

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
            {...categorieDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {categorieDialog.type === 'new' ? 'Nouveau produit' : 'Editer produit'}
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
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <SelectReactFormsy

                            id="sousSecteurs"
                            name="sousSecteurs"
                            className="MuiFormControl-fullWidth MuiTextField-root mb-24"
                            value={form.sousSecteurs}
                            onChange={(value) => handleChipChange(value, 'sousSecteurs')}
                            placeholder="Sélectionner..."
                            textFieldProps={{
                                label: 'Activités',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined'
                            }}
                            options={sousSecteurs}
                            fullWidth
                            isMulti
                            required
                        />
                    </div>


                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">ballot</Icon>
                        </div>

                        <TextFieldFormsy
                            className="mb-24"
                            label="Nom"
                            autoFocus
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

                {categorieDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Ajouter
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isFormValid}
                            >
                                Modifier
                        </Button>

                        </DialogActions>
                    )}
            </Formsy>
        </Dialog>
    );
}

export default CategoriesDialog;
