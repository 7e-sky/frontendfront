import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Breadcrumbs, Button, Icon, Select, IconButton, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import HomeIcon from '@material-ui/icons/Home';
import * as Actions from '../store/actions';
import News from './News';
import ContentLoader from "react-content-loader"
function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // minHeight      : '100%',
        position: 'relative',
        flex: '1 0 auto',
        height: 'auto',
        backgroundColor: theme.palette.background.default
    },
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    breadcrumbs: {
        fontSize: 11,
    },
    link: {
        display: 'flex',
        'align-items': 'center',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    btn: {
        fontSize: 11,
        padding: '0px 8px'
    },
    grid: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    }
}));

function NewsApp(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const news = useSelector(({ newsApp }) => newsApp.news);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(Actions.getActualites(news.parametres));
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, news.parametres]);

    function handlePreviousClick() {
        news.parametres.page = Math.max(news.parametres.page - 1, 1);
        dispatch(Actions.setParametresData(news.parametres))
        document.querySelector('.st').scrollTop = 0;
    }

    function handleNextClick() {
        news.parametres.page = Math.min(news.parametres.page + 1, news.pageCount);
        dispatch(Actions.setParametresData(news.parametres))
        document.querySelector('.st').scrollTop = 0;
    }

    function handleChangeItems(ev) {
        news.parametres.page = 1;
        news.parametres.itemsPerPage = ev.target.value;
        document.querySelector('.st').scrollTop = 0;
        dispatch(Actions.setParametresData(news.parametres))
    }

    function handleTitreChange(ev) {
        news.parametres.page = 1;
        news.parametres.titre = ev.target.value;
        document.querySelector('.st').scrollTop = 0;
        dispatch(Actions.setParametresData(news.parametres))
    }

    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, '  min-h-md')}>
            <Helmet>
                <title>Toutes l'Actualité | Les Achats Industriels</title>
                <meta name="description" content='' />
            </Helmet>
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container spacing={2}
                    classes={{
                        'spacing-xs-2': classes.grid
                    }} className="max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <div className="flex items-center">
                            <Button variant="outlined" size="small" color="secondary" onClick={() => props.history.goBack()} className={clsx(classes.btn, "mr-8")}>
                                <Icon>chevron_left</Icon> <span className="transition ease-in-out duration-700 ">Retour</span>
                            </Button>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs} aria-label="breadcrumb">
                                    <Link color="inherit" to="/" className={classes.link}>
                                        <HomeIcon className={classes.icon} />
                                        Accueil
                                </Link>
                                    <span className="text-white">
                                        Toute l'actualité
                                </span>
                                </Breadcrumbs>
                            </FuseAnimate>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Grid container classes={{
                'spacing-xs-2': classes.grid
            }} spacing={2} className="max-w-2xl mx-auto sm:px-16 pt-24 items-center">
                <Grid item sm={8} xs={8}>
                    <Typography variant="h1" className="text-24 font-bold uppercase"> Les Achats Industriels | Actualités</Typography>
                </Grid>
                <Grid item sm={4} xs={4}>
                    <TextField
                        label="Rechercher"
                        placeholder="Entrer un mot clé..."
                        className="flex w-full  mb-16 sm:mb-0 "
                        value={news.parametres.titre}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={handleTitreChange}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container classes={{
                'spacing-xs-2': classes.grid
            }} spacing={2} className="max-w-2xl mx-auto py-24 sm:px-16 items-start">

                {
                    news.loading ?
                        generate(
                            <Grid item xs={12} sm={4} lg={3}>
                                <ContentLoader
                                    speed={2}
                                    width={119}
                                    height={100}
                                    viewBox="0 0 119 100"
                                >
                                    <rect x="4" y="7" rx="0" ry="0" width="125" height="77" />
                                    <rect x="7" y="95" rx="3" ry="3" width="85" height="7" />
                                </ContentLoader>
                            </Grid>
                        ) :
                        news.data && news.data.map((item, index) => (
                            <Grid key={index} item xs={12} sm={4} lg={3}>
                                <News news={item} />
                            </Grid>
                        ))

                }

                {
                    news.data && (
                        <Grid container classes={{
                            'spacing-xs-2': classes.grid
                        }} spacing={2} className="justify-between mt-16">
                            <Grid item xs={12} md={6}>
                                Montrer:&ensp;
                                            <Select
                                    className="text-13"
                                    native
                                    value={news.parametres.itemsPerPage}
                                    onChange={handleChangeItems}
                                    inputProps={{
                                        name: 'ItemsPerPage'
                                    }}
                                >

                                    <option value='10'>10</option>
                                    <option value='50'>50 </option>
                                    <option value='100'>100</option>
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={6} className="text-right">
                                <IconButton aria-label="Previous" className={classes.margin} disabled={news.parametres.page === 1} onClick={handlePreviousClick}>
                                    <Icon>arrow_back</Icon>
                                </IconButton>
                                {news.parametres.page} / {news.pageCount}<IconButton aria-label="Next" disabled={news.parametres.page === news.pageCount} className={classes.margin} onClick={handleNextClick}>
                                    <Icon>arrow_forward</Icon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    )
                }

            </Grid>
        </div>

    )
}

export default withReducer('newsApp', reducer)(NewsApp);