import React, { useRef } from 'react';
import { Popper, ClickAwayListener, MenuItem, Icon, IconButton, ListItemText, Paper, TextField, Tooltip, Typography, ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Autosuggest from 'react-autosuggest';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Highlighter from "react-highlight-words";
import history from '@history';



function renderSuggestion(suggestion, { query, isHighlighted }) {
    // console.log('===========================Render Suggestions===============================')
    //console.log(suggestion)
    let result = '';
    //let img = '';
    if (suggestion.societe) {
        result = suggestion.societe;
        //    img = <Avatar >{suggestion.societe[0]}</Avatar>
    }
    else if (suggestion.titre) {
        result = suggestion.titre
        /* suggestion.featuredImageId ?
             img = <Avatar alt={suggestion.titre} src={FuseUtils.getUrl() + suggestion.featuredImageId.url} />
             :
             img = <Avatar alt={suggestion.titre} src="assets/images/ecommerce/product-placeholder.jpg" />
 */
    }
    else if (suggestion.name) {
        result = suggestion.name
        // img = <Avatar >{suggestion.name[0]}</Avatar>
    }
    else if (suggestion.autreFrs) {
        result = suggestion.autreFrs
    }
    else if (suggestion.autreProduits) {
        result = suggestion.autreProduits
    }

    return (
        <MenuItem selected={isHighlighted} component="div" dense={true}>
            <ListItemText
                className="pl-0"
                primary={
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={result}
                    />
                }
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more">
                    <Icon className="text-16 arrow-icon">chevron_right</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </MenuItem>

    );
}

function getSuggestionValue(suggestion) {
    let result = '';
    if (suggestion.societe) {
        result = suggestion.societe
    }
    else if (suggestion.titre) {
        result = suggestion.titre
    }
    else if (suggestion.name) {
        result = suggestion.name
    }
    else if (suggestion.autreFrs) {
        result = suggestion.autreFrs
    }
    else if (suggestion.autreProduits) {
        result = suggestion.autreProduits
    }
    return result;
}
function getSectionSuggestions(section) {

    return section.suggestions;
}
function renderSectionTitle(section) {

    if (section.suggestions.length === 0) {
        return
    }
    return (
        <Typography variant="h6" className="py-4 px-8 bg-gray-300">{section.title}</Typography>
    );
}
const useStyles = makeStyles(theme => ({
    root: {},
    container: {
        position: 'relative'
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0
    },
    suggestion: {
        display: 'block'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    },
    input: {
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        }),
        '&:focus': {
            backgroundColor: theme.palette.background.paper
        }
    }
}));

function Search(props) {
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const classes = useStyles(props);
    const suggestionsNode = useRef(null);
    const popperNode = useRef(null);
    const dispatch = useDispatch();

    function showSearch() {
        dispatch(Actions.showSearch());
        document.addEventListener("keydown", escFunction, false);
    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
        document.removeEventListener("keydown", escFunction, false);
    }

    function escFunction(event) {
        if (event.keyCode === 27) {
            hideSearch();
        }
        /*  if (event.keyCode === 13) {
              event.target.value && history.push(`/vente-produits?q=${event.target.value}`);
          }*/
    }

    function handleSuggestionsFetchRequested({ value }) {
        if (value.trim().length > 1) {
            dispatch(Actions.loadSuggestions(value.trim()));
            // Fake an AJAX call
        }
    }


    function handleSuggestionSelected(event, { suggestion }) {
        event.preventDefault();
        event.stopPropagation();
        let url;
        if (!suggestion) {
            return;
        }
        if (suggestion.societe) {
            url = `/entreprise/${suggestion.id}-${suggestion.slug}`
        }
        else if (suggestion.titre) {
            url = `/detail-produit/${suggestion.sec}/${suggestion.soussec}/${suggestion.id}-${suggestion.slug}`
        }
        else if (suggestion.name) {
            url = `/vente-produits/${suggestion.sect}/${suggestion.slug}`
        }
        else if (suggestion.autreFrs) {
            url = `/entreprises?q=${suggestion.value}`
        }
        else if (suggestion.autreProduits) {
            url = `/vente-produits?q=${suggestion.value}`
        }
        history.push(url);
        hideSearch();
    }

    function handleSuggestionsClearRequested() {
        dispatch(Actions.cleanUp());
    }

    function handleChange(event) {
        dispatch(Actions.setGlobalSearchText(event))
    }

    function handleClickAway(event) {
        return (
            !suggestionsNode.current ||
            !suggestionsNode.current.contains(event.target)
        ) && hideSearch();
    }

    function renderInputComponent(inputProps) {
        const {
            variant,
            classes, inputRef = () => {
            }, ref, ...other
        } = inputProps;
        return (
            <div className="w-full relative">
                {variant === "basic" ? (
                    // Outlined
                    <React.Fragment>
                        <TextField
                            fullWidth
                            InputProps={{
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: clsx(classes.input, "py-0 px-16 h-48 pr-48"),
                                    notchedOutline: "rounded-8"
                                }
                            }}
                            variant="outlined"
                            {...other}
                        />
                        {globalSearch.loading ? (
                            <CircularProgress color="secondary" className="absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none" />
                        )
                            :
                            <Icon className="absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none" color="action">search</Icon>
                        }
                    </React.Fragment>
                )
                    :
                    (
                        // Standard
                        <TextField
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: clsx(classes.input, "py-0 px-16 h-64")
                                }
                            }}
                            variant="standard"
                            {...other}
                        />
                    )}
            </div>
        );
    }
    const autosuggestProps = {
        renderInputComponent,
        highlightFirstSuggestion: true,
        multiSection: true,
        suggestions: globalSearch.suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        onSuggestionSelected: handleSuggestionSelected,
        renderSectionTitle: renderSectionTitle,
        getSectionSuggestions: getSectionSuggestions,
        getSuggestionValue,
        renderSuggestion
    };

    switch (props.variant) {
        case 'basic':
            {
                return (
                    <div className={clsx("flex items-center w-full", props.className)} ref={popperNode}>
                        <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                                variant: props.variant,
                                classes,
                                placeholder: 'Rechercher un produit, une activité, un fournisseur',
                                value: globalSearch.searchText,
                                onChange: handleChange,
                                onFocus: showSearch,
                                InputLabelProps: {
                                    shrink: true
                                },
                                autoFocus: false
                            }}
                            theme={{
                                container: "flex flex-1 w-full",
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion
                            }}
                            renderSuggestionsContainer={options => (
                                <Popper
                                    anchorEl={popperNode.current}
                                    open={Boolean(options.children) || globalSearch.noSuggestions || globalSearch.loading}
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
                                            {globalSearch.noSuggestions && (
                                                <Typography className="px-16 py-12">
                                                    Aucun résultat..
                                                </Typography>
                                            )}

                                        </Paper>
                                    </div>
                                </Popper>
                            )}
                        />
                    </div>
                )
            }
        case 'full':
            {
                return (
                    <div className={clsx(classes.root, "flex", props.className)}>

                        <Tooltip title="Click to search" placement="bottom">
                            <div onClick={showSearch}>
                                {props.trigger}
                            </div>
                        </Tooltip>

                        {globalSearch.opened && (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <Paper
                                    className="absolute left-0 right-0 h-full z-9999"
                                    square={true}
                                >
                                    <div className="flex items-center w-full" ref={popperNode}>
                                        <Autosuggest
                                            {...autosuggestProps}
                                            inputProps={{
                                                classes,
                                                placeholder: 'Rechercher un produit, une activité, un fournisseur',
                                                value: globalSearch.searchText,
                                                onChange: handleChange,
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                autoFocus: true
                                            }}
                                            theme={{
                                                container: "flex flex-1 w-full",
                                                suggestionsList: classes.suggestionsList,
                                                suggestion: classes.suggestion
                                            }}
                                            renderSuggestionsContainer={options => (
                                                <Popper
                                                    anchorEl={popperNode.current}
                                                    open={Boolean(options.children) || globalSearch.noSuggestions || globalSearch.loading}
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
                                                            {globalSearch.noSuggestions && (
                                                                <Typography className="px-16 py-12">
                                                                    Aucun résultat..
                                                                </Typography>
                                                            )}
                                                            {globalSearch.loading && (
                                                                <div className="px-16 py-12 text-center">
                                                                    <CircularProgress color="secondary" /> <br /> Chargement ...
                                                                </div>
                                                            )}
                                                        </Paper>
                                                    </div>
                                                </Popper>
                                            )}
                                        />
                                        <IconButton onClick={hideSearch} className="mx-8">
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </div>
                                </Paper>
                            </ClickAwayListener>
                        )}
                    </div>
                )
            }
        default:
            {
                return null;
            }
    }
}

Search.propTypes = {};
Search.defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>),
    variant: 'full'// basic, full
};

export default withReducer('globalSearchApp', reducer)(Search);