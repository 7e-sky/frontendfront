import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Card, Icon, CardContent, List, ListItem, ListItemText, Typography, Chip } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import LinearProgress from '@material-ui/core/LinearProgress';
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




function SideBareSearch(props) {

    const classes = useStyles();
    const loadingSecteurs = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loadingSecteurs);
    const secteurs = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.secteurs);
    const loadingActivites = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loadingActivites);
    const activites = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.activites);
    const loadingCategories = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loadingCategories);
    const categories = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.categories);
    const loadingPays = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loadingPays);
    const payss = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.pays);
    const fournisseurs = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.data);
    const loadingVilles = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loadingVilles);
    const villes = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.villes);

    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");
    const ville = query.get("ville");
    const q = query.get("q");

    function handleDeletePathSecteur() {
        let searchText;
        if (pays)
            searchText = (q ? '&q=' + q : '')
        else searchText = (q ? 'q=' + q : '')
        props.history.push({ pathname: '/entreprises', search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText })
        document.querySelector('.st').scrollTop = 0;
    }

    function handleDeletePathActivite() {
        let searchText;
        if (pays)
            searchText = (q ? '&q=' + q : '')
        else searchText = (q ? 'q=' + q : '')
        props.history.push({ pathname: '/entreprises/' + secteur, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText })
        document.querySelector('.st').scrollTop = 0;
    }

    function handleDeletePathCategorie() {
        let searchText;
        let secteurParm = '';
        let activiteParm = '';
        if (secteur) {
            secteurParm = '/' + secteur;
        }
        if (activite) {
            activiteParm = '/' + activite;
        }

        const path = secteurParm + activiteParm;
        if (pays)
            searchText = (q ? '&q=' + q : '')
        else searchText = (q ? 'q=' + q : '')
        props.history.push({ pathname: '/entreprises' + path, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText })
        document.querySelector('.st').scrollTop = 0;
    }

    function handleDeleteQuerySearchText() {
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
        props.history.push({ pathname: '/entreprises' + path, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') })
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
        props.history.push({ pathname: '/entreprises' + path, search: q ? 'q=' + q : '' })
        document.querySelector('.st').scrollTop = 0;
    }

    function getSecteurTitle() {
        return secteurs.length > 0 ? secteurs.filter(x => x.slug === secteur)[0] && _.capitalize(secteurs.filter(x => x.slug === secteur)[0].name) : _.capitalize(secteur.replace('-', ' '))
    }
    function getActiviteTitle() {
        return activites.length > 0 ? activites.filter(x => x.slug === activite)[0] && _.capitalize(activites.filter(x => x.slug === activite)[0].name) : _.capitalize(activite.replace('-', ' '))
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
                            fournisseurs.length > 0 && pays ?
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Chip
                                                    label={_.capitalize(fournisseurs[0].pays && fournisseurs[0].pays.name)}
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
                                                                    props.history.push({ pathname: location.pathname, search: 'pays=' + pays + '&ville=' + item.slug + (q ? '&q=' + q : '') })
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
                                                            props.history.push({ pathname: location.pathname, search: 'pays=' + query.get('pays') + (q ? '&q=' + q : '') })
                                                            document.querySelector('.st').scrollTop = 0;
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
                            fournisseurs.length > 0 && secteur ?
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Chip
                                                    label={getSecteurTitle()}
                                                    onDelete={handleDeletePathSecteur}
                                                    onClick={handleDeletePathActivite}
                                                    className={classes.chip}
                                                    color="primary"
                                                    variant="outlined"
                                                />}
                                        />

                                    </ListItem>
                                    <List component="div" className={classes.listRoot2}>
                                        {
                                            fournisseurs.length > 0 && activite ?
                                                <>
                                                    <ListItem className={classes.nested}>
                                                        <ListItemText
                                                            primary={
                                                                <Chip
                                                                    label={getActiviteTitle()}
                                                                    onDelete={handleDeletePathActivite}
                                                                    onClick={handleDeletePathCategorie}
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
                                                                                    let searchText;
                                                                                    if (pays)
                                                                                        searchText = (q ? '&q=' + q : '')
                                                                                    else searchText = (q ? 'q=' + q : '')
                                                                                    item.slug !== categorie &&
                                                                                        (props.history.push({ pathname: '/entreprises/' + secteur + '/' + activite + '/' + item.slug, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText }))
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
                                                                        let searchText;
                                                                        if (pays)
                                                                            searchText = (q ? '&q=' + q : '')
                                                                        else searchText = (q ? 'q=' + q : '')
                                                                        props.history.push({ pathname: '/entreprises/' + secteur + '/' + item.slug, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText });
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
                                                            let searchText;
                                                            if (pays)
                                                                searchText = (q ? '&q=' + q : '')
                                                            else searchText = (q ? 'q=' + q : '')
                                                            props.history.push({ pathname: '/entreprises/' + secteur.slug, search: (pays ? 'pays=' + pays : '') + (ville ? '&ville=' + ville : '') + searchText })
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

            {
                q &&
                <Card className='mt-16'>

                    <CardContent>
                        <Typography color="textPrimary" className="pl-16 text-18 uppercase w-full " >
                            par <span className='font-extrabold'>mot clé</span>
                        </Typography>
                        <Chip
                            label={_.capitalize(q)}
                            onDelete={handleDeleteQuerySearchText}
                            className={clsx(classes.chip, 'mt-16 ml-8')}
                            color="primary"
                            variant="outlined"
                        /> </CardContent>

                </Card>

            }
        </>

    )
}

export default SideBareSearch;