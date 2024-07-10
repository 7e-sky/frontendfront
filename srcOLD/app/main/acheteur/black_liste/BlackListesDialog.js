import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, DialogTitle, DialogContentText, ListItemText, CircularProgress, Popper, Chip } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse';
import Formsy from 'formsy-react';
import _ from '@lodash';
import Autosuggest from 'react-autosuggest';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Highlighter from "react-highlight-words";

const defaultFormState = {
    raison: '',
    fournisseur: '',
};

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        width: '100%',
    },

    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
        <MenuItem selected={isHighlighted} component="div" className="z-999" dense={true}>
            <ListItemText
                className="pl-0 "
                primary={
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={suggestion.societe}
                    />
                }
                secondary={suggestion.firstName + ' ' + suggestion.lastName}
            />
        </MenuItem>

    );

}
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;
    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}
function BlackListesDialog(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const BlackListesDialog = useSelector(({ blackListesApp }) => blackListesApp.blackListes.blackListesDialog);
    const loading = useSelector(({ blackListesApp }) => blackListesApp.blackListes.loading);
    const searchFournisseur = useSelector(({ blackListesApp }) => blackListesApp.searchFournisseur);
    const [fournisseur, setFournisseur] = React.useState(null);
    const user = useSelector(({ auth }) => auth.user);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const suggestionsNode = useRef(null);
    const popperNode = useRef(null);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (BlackListesDialog.type === 'edit' && BlackListesDialog.data) {
                setForm({ ...BlackListesDialog.data });
                setFournisseur(BlackListesDialog.data.fournisseur);
                setForm(_.set({ ...BlackListesDialog.data }, 'fournisseur', BlackListesDialog.data.fournisseur['@id']));
            }

            /**
             * Dialog type: 'new'
             */
            if (BlackListesDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...BlackListesDialog.data,
                });
            }
        },
        [BlackListesDialog.data, BlackListesDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (BlackListesDialog.props.open) {
            initDialog();
        }

    }, [BlackListesDialog.props.open, initDialog]);



    function closeComposeDialog() {
        BlackListesDialog.type === 'edit' ? dispatch(Actions.closeEditBlackListesDialog()) : dispatch(Actions.closeNewBlackListesDialog());
    }


    function handleCheckBoxChange(e, name) {

        setForm(_.set({ ...form }, name, e.target.checked));
    }
    function handleSubmit(event) {
        //event.preventDefault();

        if (BlackListesDialog.type === 'new') {
            dispatch(Actions.addBlackListe(form, user.id));
            //setFournisseur({ societe: '' });
        }
        else {
            dispatch(Actions.updateBlackListe(form, user.id));
            //setFournisseur({ societe: '' });
        }
        //closeComposeDialog();
    }

    function handleRemove() {

        dispatch(Actions.removeBlackListe(form, user.id));
        dispatch(Actions.closeDialog())
        closeComposeDialog();
    }


    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleChangeSearch(event) {
        dispatch(Actions.setGlobalSearchText(event))
    }
    function showSearch() {
        dispatch(Actions.showSearch());
    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
    }


    function handleSuggestionsFetchRequested({ value }) {
        if (value.trim().length > 1) {
            dispatch(Actions.loadSuggestions(value.trim()));
            // Fake an AJAX call
        }
    }
    function handleSuggestionsClearRequested() {
        dispatch(Actions.cleanUp());
    }
    const autosuggestProps = {
        renderInputComponent,
        highlightFirstSuggestion: true,
        suggestions: searchFournisseur.suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        renderSuggestion
    };

    function handleDelete() {
        setFournisseur(null);
        setForm(_.set({ ...form }, 'fournisseur', null))
    }

    return (
        <Dialog
            classes={{
                paper: "m-24 overflow-visible"
            }}
            {...BlackListesDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {BlackListesDialog.type === 'new' ? 'Nouveau BlackListe' : 'Editer BlackListe'}
                    </Typography>
                </Toolbar>

            </AppBar>
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col overflow-visible">
                <DialogContent classes={{ root: "p-24 overflow-visible" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <div className="w-full" ref={popperNode}>
                            <Autosuggest
                                {...autosuggestProps}
                                getSuggestionValue={suggestion => suggestion.societe}
                                onSuggestionSelected={(event, { suggestion, method }) => {
                                    if (method === "enter") {
                                        event.preventDefault();
                                    }
                                    setFournisseur(suggestion);
                                    setForm(_.set({ ...form }, 'fournisseur', suggestion['@id']))
                                    hideSearch();
                                }}
                                required
                                inputProps={{
                                    classes,
                                    label: 'Fournisseur',
                                    placeholder: "Cherchez avec le nom de la société",
                                    value: searchFournisseur.searchText,
                                    variant: "outlined",
                                    name: "fournisseur",
                                    onChange: handleChangeSearch,
                                    onFocus: showSearch,
                                    InputLabelProps: {
                                        shrink: true,
                                    }

                                }}
                                theme={{
                                    container: classes.container,
                                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                    suggestionsList: classes.suggestionsList,
                                    suggestion: classes.suggestion,
                                }}
                                renderSuggestionsContainer={options => (
                                    <Popper
                                        anchorEl={popperNode.current}
                                        open={Boolean(options.children) || searchFournisseur.noSuggestions || searchFournisseur.loading}
                                        popperOptions={{ positionFixed: true }}
                                        className="z-9999"
                                    >
                                        <div ref={suggestionsNode}>
                                            <Paper
                                                elevation={1}
                                                square
                                                {...options.containerProps}
                                                style={{ width: popperNode.current ? popperNode.current.clientWidth : null }}
                                            >
                                                {options.children}
                                                {searchFournisseur.noSuggestions && (
                                                    <Typography className="px-16 py-12">
                                                        Aucun résultat..
                                                    </Typography>
                                                )}
                                                {searchFournisseur.loading && (
                                                    <div className="px-16 py-12 text-center">
                                                        <CircularProgress color="secondary" /> <br /> Chargement ...
                                                    </div>
                                                )}
                                            </Paper>
                                        </div>
                                    </Popper>
                                )}
                            />

                        </div>


                    </div>
                    {
                        fournisseur &&

                        <Chip
                            label={fournisseur.societe}
                            onDelete={handleDelete}
                            className="mt-8 ml-48"
                        />

                    }


                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chat</Icon>
                        </div>

                        <TextFieldFormsy
                            className="mb-24 mt-24"
                            label="Raison"
                            id="raison"
                            name="raison"
                            value={form.raison}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 6
                            }}
                            validationErrors={{
                                minLength: 'La longueur minimale des caractères est de 6'
                            }}
                            required
                            multiline
                            rows="4"
                            fullWidth
                        />
                    </div>
                    {
                        BlackListesDialog.type === 'edit' ?
                            <div className="flex">
                                <div className="min-w-48 ">
                                </div>
                                <CheckboxFormsy
                                    className="mb-24 "
                                    name="etat"
                                    value={form.etat}
                                    label="Blacklister"
                                    onChange={(e) => handleCheckBoxChange(e, 'etat')}
                                    fullWidth
                                />
                            </div>
                            : ''
                    }


                </DialogContent>

                {BlackListesDialog.type === 'new' ? (
                    <DialogActions className="pl-16">
                        <Button onClick={() => dispatch(Actions.closeNewBlackListesDialog())} color="primary">
                            Annuler
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid || !fournisseur || loading}
                        >
                            Ajouter
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-16">
                            <Button onClick={() => dispatch(Actions.closeEditBlackListesDialog())} color="primary">
                                Annuler
                                                    </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isFormValid || !fournisseur || loading}
                            >
                                Modifier
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                            <IconButton
                                onClick={() => dispatch(Actions.openDialog({
                                    children: (
                                        <React.Fragment>
                                            <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Voulez vous vraiment supprimer cet enregistrement ?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                    Non
                                                </Button>
                                                <Button onClick={handleRemove} color="primary" autoFocus>
                                                    Oui
                                                </Button>

                                            </DialogActions>
                                        </React.Fragment>
                                    )
                                }))}


                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </Formsy>
        </Dialog>
    );
}

export default BlackListesDialog;
