import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Card, Icon, CardContent, List, ListItem, ListItemText, Typography, Chip } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Actions from '../store/actions';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    listRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 300,
    },
    listRoot2: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 300,
        padding: 0,
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    filterIcon: {
        color: 'white',
        fontSize: 40,
        width: 40,
        height: 40,
        marginRight: 8,
        pointerEvents: 'none'
    },

    chip: {
        margin: theme.spacing(0),
        height: 27,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        padding: 0,
    },
    nested2: {
        paddingLeft: theme.spacing(8),
        padding: 0,
    },

}));
function useQuery(location) {
    return new URLSearchParams(location.search);
}


function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function SideBareSearch(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const loadingSecteurs = useSelector(({ demandesAchat }) => demandesAchat.demandes.loadingSecteurs);
    const secteurs = useSelector(({ demandesAchat }) => demandesAchat.demandes.secteurs);
    const loadingActivites = useSelector(({ demandesAchat }) => demandesAchat.demandes.loadingActivites);
    const activites = useSelector(({ demandesAchat }) => demandesAchat.demandes.activites);
    const loadingCategories = useSelector(({ demandesAchat }) => demandesAchat.demandes.loadingCategories);
    const categories = useSelector(({ demandesAchat }) => demandesAchat.demandes.categories);
    const loadingPays = useSelector(({ demandesAchat }) => demandesAchat.demandes.loadingPays);
    const loadingVilles = useSelector(({ demandesAchat }) => demandesAchat.demandes.loadingVilles);
    const payss = useSelector(({ demandesAchat }) => demandesAchat.demandes.pays);
    const villes = useSelector(({ demandesAchat }) => demandesAchat.demandes.villes);
    const parametres = useSelector(({ demandesAchat }) => demandesAchat.demandes.parametres);
    const demandes = useSelector(({ demandesAchat }) => demandesAchat.demandes.data);

    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");
    const ville = query.get("ville");

    function handleDeletePathSecteur() {
        props.history.push({ pathname: '/demandes-achats', search: pays && (ville ? 'pays=' + pays + '&ville=' + ville : 'pays=' + pays) })
        document.querySelector('.st').scrollTop = 0;
        parametres.page = 1;
        dispatch(Actions.setParametresData(parametres))
    }
    function handleDeletePathActivite() {

        props.history.push({ pathname: '/demandes-achats/' + secteur, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') })
        document.querySelector('.st').scrollTop = 0;
    }


    function handleDeleteQueryPays() {

        let secteurParm = '';
        let activiteParm = '';
        let categorieParm = '';

        if (secteur) {
            secteurParm = '/' + secteur;
        }
        if (activite) {
            activiteParm = '/' + activite;
        }
        if (categorie) {
            categorieParm = '/' + categorie;
        }
        const path = secteurParm + activiteParm + categorieParm;
        props.history.push({ pathname: '/demandes-achats' + path, search: '' })
        document.querySelector('.st').scrollTop = 0;
        parametres.page = 1;
        dispatch(Actions.setParametresData(parametres))
    }

    return (
        <>
            <Card className={clsx("", classes.root)} >
                <div className="p-20 bg-gray-400 uppercase flex items-center font-bold text-16 ">
                    <Icon className={classes.filterIcon}>settings_input_component</Icon>

                    <span>  Affinez votre recherche</span>
                </div>
                <CardContent>
                    <Typography color="textPrimary" className="pl-16 text-18 uppercase w-full " >
                        par <span className='font-extrabold'>pays</span>
                    </Typography>
                    <List dense={true} className={classes.listRoot}>
                        {
                            pays ?
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Chip
                                                    label={jsUcfirst(pays.replace('-', ' '))}
                                                    onDelete={handleDeleteQueryPays}
                                                    className={classes.chip}
                                                    color="primary"
                                                    variant="outlined"
                                                />}
                                        />
                                    </ListItem>
                                    <List component="div" className={classes.listRoot2}>
                                        {
                                            loadingVilles ?
                                                <LinearProgress color="secondary" /> :
                                                <FuseAnimateGroup
                                                    enter={{
                                                        animation: "transition.slideUpBigIn"
                                                    }}
                                                >
                                                    {
                                                        villes && villes.map((item, index) => (
                                                            <ListItem
                                                                key={index}
                                                                className={classes.nested}
                                                                selected={item.slug === ville}
                                                                button={item.slug !== ville}
                                                                onClick={event => {
                                                                    const location = props.location;
                                                                    query.set('ville', item.slug)
                                                                    props.history.push({ pathname: location.pathname, search: 'pays=' + pays + '&ville=' + item.slug })
                                                                    document.querySelector('.st').scrollTop = 0;
                                                                    parametres.page = 1;
                                                                    dispatch(Actions.setParametresData(parametres))
                                                                }}>
                                                                <ListItemText
                                                                    primary={item.name + ' (' + item.count + ')'}
                                                                />
                                                            </ListItem>

                                                        ))
                                                    }
                                                </FuseAnimateGroup>
                                        }

                                    </List>
                                </>
                                :
                                (
                                    loadingPays ? <LinearProgress color="secondary" /> :
                                        <FuseAnimateGroup
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                        >
                                            {
                                                payss && payss.map((item, index) => (
                                                    <ListItem
                                                        key={index}
                                                        button
                                                        onClick={event => {
                                                            const location = props.location;
                                                            query.set('pays', item.slug)
                                                            props.history.push({ pathname: location.pathname, search: 'pays=' + query.get('pays') })
                                                            document.querySelector('.st').scrollTop = 0;
                                                            parametres.page = 1;
                                                            dispatch(Actions.setParametresData(parametres))
                                                        }}>
                                                        <ListItemText
                                                            primary={item.name + ' (' + item.count + ')'}
                                                        />
                                                    </ListItem>
                                                ))
                                            }
                                        </FuseAnimateGroup>
                                )
                        }



                    </List>
                </CardContent>

            </Card>

            <Card className='mt-16'>

                <CardContent>
                    <Typography color="textPrimary" className="pl-16 text-18 uppercase w-full " >
                        par <span className='font-extrabold'>catégorie</span>
                    </Typography>
                    <List dense={true} component="nav" className={classes.listRoot}>
                        {
                            secteur ?
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Chip
                                                    label={jsUcfirst(secteur.replace('-', ' '))}
                                                    onDelete={handleDeletePathSecteur}
                                                    className={classes.chip}
                                                    color="primary"
                                                    variant="outlined"
                                                />}
                                        />

                                    </ListItem>
                                    <List component="div" className={classes.listRoot2}>

                                        {
                                            demandes.length > 0 && activite ?
                                                <>
                                                    <ListItem className={classes.nested}>
                                                        <ListItemText
                                                            primary={
                                                                <Chip
                                                                    label={_.capitalize(activite.replace('-', ' '))}
                                                                    onDelete={handleDeletePathActivite}
                                                                    className={classes.chip}
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />}
                                                        />
                                                    </ListItem>
                                                    <List component="div" className={classes.listRoot2}>
                                                        {
                                                            loadingCategories ?
                                                                <LinearProgress color="secondary" /> :
                                                                <FuseAnimateGroup
                                                                    enter={{
                                                                        animation: "transition.slideUpBigIn"
                                                                    }}
                                                                >
                                                                    {
                                                                        categories && categories.map((item, index) => (
                                                                            <ListItem
                                                                                key={index}
                                                                                className={classes.nested2}
                                                                                selected={item.slug === categorie}
                                                                                button={item.slug !== categorie}
                                                                                onClick={event => {

                                                                                    item.slug !== categorie &&
                                                                                        (props.history.push({ pathname: '/demandes-achats/' + secteur + '/' + activite + '/' + item.slug, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') }))
                                                                                    document.querySelector('.st').scrollTop = 0
                                                                                }}>
                                                                                <ListItemText
                                                                                    primary={item.name + ' (' + item.count + ')'}
                                                                                />
                                                                            </ListItem>

                                                                        ))
                                                                    }
                                                                </FuseAnimateGroup>

                                                        }
                                                    </List>
                                                </> :
                                                loadingActivites ? <LinearProgress color="secondary" /> :
                                                    <FuseAnimateGroup
                                                        enter={{
                                                            animation: "transition.slideUpBigIn"
                                                        }}
                                                    >
                                                        {
                                                            activites && activites.map((item, index) => (
                                                                <ListItem
                                                                    key={index}
                                                                    className={classes.nested}
                                                                    button
                                                                    onClick={event => {
                                                                        props.history.push({ pathname: '/demandes-achats/' + secteur + '/' + item.slug, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') });
                                                                        document.querySelector('.st').scrollTop = 0;

                                                                    }}>
                                                                    <ListItemText
                                                                        primary={item.name + ' (' + item.count + ')'}
                                                                    />
                                                                </ListItem>

                                                            ))
                                                        }
                                                    </FuseAnimateGroup>
                                        }
                                    </List>
                                </> :
                                (
                                    loadingSecteurs ?
                                        <LinearProgress color="secondary" /> :
                                        <FuseAnimateGroup
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                        >
                                            {
                                                secteurs && secteurs.map((secteur, index) => (
                                                    <ListItem
                                                        key={index}
                                                        button
                                                        onClick={event => {
                                                            props.history.push({ pathname: '/demandes-achats/' + secteur.slug, search: pays ? 'pays=' + pays : '' });
                                                            parametres.page = 1;
                                                            dispatch(Actions.setParametresData(parametres))
                                                        }}>
                                                        <ListItemText
                                                            primary={secteur.name + ' (' + secteur.count + ')'}
                                                        />
                                                    </ListItem>
                                                ))
                                            }
                                        </FuseAnimateGroup>
                                )
                        }


                    </List>
                </CardContent>

            </Card>

        </>

    )
}

export default SideBareSearch;