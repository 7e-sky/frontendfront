import React, { useEffect, useRef, useState } from 'react';
import { FuseAnimate, FuseAnimateGroup, URL_SITE } from '@fuse';
import { ClickAwayListener, Paper, Icon, Input, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider,  ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import Highlighter from "react-highlight-words";
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        height: 200,
        border: '1px solid #ccc',
        padding: 0
    },
    cat: {
        width: '100%',
        backgroundColor: '#edf2f7',
        height: 200,
        paddingTop: 20,
        fontWeight: 'bold',
        borderTop: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    },
    inline: {
        display: 'inline',
    },
}));

function GlobalSearch(props) {

    const dispatch = useDispatch();
    const [onSearch, setOnSearch] = useState(false);
    const classes = useStyles(props);
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const ResultsNode = useRef(null);
    useEffect(() => {
        if (globalSearch.searchText.length > 1 && onSearch) {
            dispatch(Actions.showSearch());
            dispatch({
                type: Actions.GS_REQUEST_PRODUITS,
            });
            dispatch({
                type: Actions.GS_REQUEST_ACTIVITES,
            });
            dispatch({
                type: Actions.GS_REQUEST_FOURNISSEUR,
            });
            const timer = setTimeout(() => {
                dispatch(Actions.getResults(globalSearch.searchText));
            }, 500);
            return () => {
                clearTimeout(timer);
                dispatch(Actions.cleanUp())
            };

        }
        else {
            dispatch(Actions.hideSearch());
        }

    }, [globalSearch.searchText, onSearch, dispatch]);

    function handleClickAway(event) {
        return (
            !ResultsNode.current ||
            !ResultsNode.current.contains(event.target)
        ) && (dispatch(Actions.hideSearch()), setOnSearch(false));
    }

    function hideSearch() {
        dispatch(Actions.hideSearch())
    }

    return (
        <div ref={ResultsNode} className={clsx("mx-auto w-full max-w-640 border border-gray-600 rounded-lg", props.className)} >
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                <Paper className="flex p-4 items-center w-full  rounded-lg" elevation={1}>

                    <Icon className="mr-8 ml-8" color="action">search</Icon>

                    <Input
                        placeholder="Rechercher un produit, une activité, un fournisseur"
                        className="flex flex-1 h-44 focus:bg-gray"
                        disableUnderline
                        fullWidth
                        onChange={(event) => {
                            dispatch(Actions.setGlobalSearchText(event));
                            setOnSearch(true)
                        }}
                        onFocus={(event) => { setOnSearch(true) }}
                        autoFocus
                        value={globalSearch.searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                    />
                </Paper>
            </FuseAnimate>
            {globalSearch.opened && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <div className="mx-auto w-full  z-999">
                            <Paper className="absolute shadow w-full z-9999" elevation={1}>
                                {

                                    <>
                                        {

                                            <Grid container spacing={2}>
                                                <Grid item xs={2} style={{
                                                    paddingRight: '0',
                                                    paddingBottom: '0',
                                                }}>
                                                    <div className={classes.cat}>
                                                        Produits
                                                    </div>
                                                </Grid>
                                                <Grid item xs={10} style={{
                                                    paddingLeft: '0',
                                                    paddingBottom: '0',
                                                }}>
                                                    <List className={classes.root} dense={true}>
                                                        {
                                                            globalSearch.loadingProduits
                                                                ?
                                                                <ContentLoader
                                                                    viewBox="0 0 400 100"
                                                                    height={100}
                                                                    width={400}
                                                                    speed={2}
                                                                >
                                                                    <circle cx="150" cy="86" r="8" />
                                                                    <circle cx="194" cy="86" r="8" />
                                                                    <circle cx="238" cy="86" r="8" />
                                                                </ContentLoader>
                                                                :
                                                                <FuseAnimateGroup
                                                                    enter={{
                                                                        animation: "transition.slideUpBigIn"
                                                                    }}
                                                                >
                                                                    {
                                                                        globalSearch.produits.length > 0 ?
                                                                            globalSearch.produits.map((produit, index) => (

                                                                                <React.Fragment key={index}>

                                                                                    <ListItem
                                                                                        component={Link}
                                                                                        to={`/detail-produit/${produit.secteur ? produit.secteur.slug : ''}/${produit.sousSecteurs ? produit.sousSecteurs.slug : ''}/${produit.id}-${produit.slug}`}
                                                                                        dense={true}
                                                                                        onClick={() => { hideSearch(); setOnSearch(false) }}
                                                                                        button alignItems="flex-start">
                                                                                        <ListItemAvatar>
                                                                                            {
                                                                                                produit.featuredImageId ?
                                                                                                    <Avatar alt={produit.titre} src={URL_SITE + produit.featuredImageId.url} />
                                                                                                    :
                                                                                                    <Avatar alt={produit.titre} src="assets/images/ecommerce/product-placeholder.jpg" />
                                                                                            }
                                                                                        </ListItemAvatar>
                                                                                        <ListItemText primary={
                                                                                            <Highlighter
                                                                                                highlightClassName="YourHighlightClass"
                                                                                                searchWords={[globalSearch.searchText]}
                                                                                                autoEscape={true}
                                                                                                textToHighlight={produit.titre}
                                                                                            />}
                                                                                            secondary={
                                                                                                _.capitalize(_.truncate(produit.description, {
                                                                                                    'length': 50
                                                                                                }))
                                                                                            } />
                                                                                        <ListItemSecondaryAction>

                                                                                            {
                                                                                                produit.pu
                                                                                                    ?
                                                                                                    <span className="text-green">{produit.pu + ' ' + (produit.currency ? produit.currency.name : '') + ' HT'}</span>
                                                                                                    : ''
                                                                                            }

                                                                                        </ListItemSecondaryAction>
                                                                                    </ListItem>
                                                                                    <Divider variant="inset" component="li" />
                                                                                </React.Fragment>
                                                                            ))
                                                                            :
                                                                            <ListItem
                                                                                dense={true}
                                                                                alignItems="flex-start">
                                                                                <ListItemText primary={"Aucun résultat trouvré pour « " + globalSearch.searchText + " » par nom produit"}
                                                                                />

                                                                            </ListItem>
                                                                    }

                                                                </FuseAnimateGroup>
                                                        }

                                                    </List>
                                                </Grid>

                                            </Grid>

                                        }
                                        {

                                            <Grid container spacing={2}>
                                                <Grid item xs={2} style={{
                                                    paddingRight: '0',
                                                    paddingBottom: '0',
                                                }}>
                                                    <div className={classes.cat} style={{
                                                        borderTop: '0',

                                                    }}>
                                                        Activités
                                                                    </div>
                                                </Grid>
                                                <Grid item xs={10} style={{
                                                    paddingLeft: '0',
                                                    paddingBottom: '0',
                                                }}>
                                                    <List className={classes.root} style={{
                                                        borderTop: '0',

                                                    }} dense={true}>
                                                        {!globalSearch.loadingActivites ?
                                                            <FuseAnimateGroup
                                                                enter={{
                                                                    animation: "transition.slideUpBigIn"
                                                                }}
                                                            >
                                                                {

                                                                    globalSearch.activites.length > 0 ?
                                                                        globalSearch.activites.map((activite, index) => (

                                                                            <React.Fragment key={index}>
                                                                                <ListItem
                                                                                    component={Link}
                                                                                    to={`/vente-produits/${activite.secteur ? activite.secteur.slug : ''}/${activite.slug}`}
                                                                                    onClick={() => { hideSearch(); setOnSearch(false) }}
                                                                                    dense={true}
                                                                                    button>
                                                                                    <ListItemText
                                                                                        primary={<Highlighter
                                                                                            highlightClassName="YourHighlightClass"
                                                                                            searchWords={[globalSearch.searchText]}
                                                                                            autoEscape={true}
                                                                                            textToHighlight={activite.name}
                                                                                        />}
                                                                                    />
                                                                                </ListItem>
                                                                            </React.Fragment>
                                                                        ))
                                                                        :
                                                                        <ListItem
                                                                            dense={true}
                                                                            alignItems="flex-start">

                                                                            <ListItemText primary={"Aucun résultat trouvré pour « " + globalSearch.searchText + " » par nom d'activité"}
                                                                            />

                                                                        </ListItem>
                                                                }
                                                            </FuseAnimateGroup>
                                                            : <ContentLoader
                                                                viewBox="0 0 400 100"
                                                                height={100}
                                                                width={400}
                                                                speed={2}
                                                            >
                                                                <circle cx="150" cy="86" r="8" />
                                                                <circle cx="194" cy="86" r="8" />
                                                                <circle cx="238" cy="86" r="8" />
                                                            </ContentLoader>}
                                                    </List>
                                                </Grid>

                                            </Grid>

                                        }

                                        <Grid container spacing={2}>
                                            <Grid item xs={2} style={{
                                                paddingRight: '0',
                                                paddingBottom: '0',
                                            }}>
                                                <div className={classes.cat} style={{
                                                    borderTop: '0',

                                                }}>
                                                    Fournisseurs
                                                            </div>
                                            </Grid>
                                            <Grid item xs={10} style={{
                                                paddingLeft: '0',
                                                paddingBottom: '0',
                                            }}>
                                                <List className={classes.root} style={{
                                                    borderTop: '0',

                                                }} dense={true}>
                                                    {!globalSearch.loadingFournisseurs ?
                                                        <FuseAnimateGroup
                                                            enter={{
                                                                animation: "transition.slideUpBigIn"
                                                            }}
                                                        >
                                                            {

                                                                globalSearch.fournisseurs.length > 0 ?
                                                                    globalSearch.fournisseurs.map((fournisseur, index) => (

                                                                        <React.Fragment key={index}>
                                                                            <ListItem
                                                                                component={Link} to={`/entreprise/${fournisseur.id}-${fournisseur.slug}`}
                                                                                onClick={() => { hideSearch(); setOnSearch(false) }}
                                                                                dense={true}
                                                                                button>
                                                                                <ListItemText
                                                                                    primary={<Highlighter
                                                                                        highlightClassName="YourHighlightClass"
                                                                                        searchWords={[globalSearch.searchText]}
                                                                                        autoEscape={true}
                                                                                        textToHighlight={fournisseur.societe}
                                                                                    />}
                                                                                />
                                                                            </ListItem>
                                                                        </React.Fragment>
                                                                    ))
                                                                    :
                                                                    <ListItem
                                                                        dense={true}
                                                                        alignItems="flex-start">
                                                                        <ListItemText primary={"Aucun résultat trouvré pour « " + globalSearch.searchText + " » par nom fournisseur"}
                                                                        />

                                                                    </ListItem>
                                                            }
                                                        </FuseAnimateGroup>
                                                        : <ContentLoader
                                                            viewBox="0 0 400 100"
                                                            height={100}
                                                            width={400}
                                                            speed={2}
                                                        >
                                                            <circle cx="150" cy="86" r="8" />
                                                            <circle cx="194" cy="86" r="8" />
                                                            <circle cx="238" cy="86" r="8" />
                                                        </ContentLoader>}
                                                </List>
                                            </Grid>

                                        </Grid>
                                    </>


                                }


                            </Paper>
                        </div>
                    </FuseAnimate>
                </ClickAwayListener>)
            }
        </div>
    )


}

export default withReducer('globalSearchApp', reducer)(GlobalSearch);

