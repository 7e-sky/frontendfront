import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimateGroup } from '@fuse';
import _ from '@lodash';
import clsx from 'clsx';
import { Chip, Icon, IconButton, Select } from '@material-ui/core';
import ContentLoader from "react-content-loader"
import * as Actions from '../store/actions';

function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        maxWidth: '100%',
    },
    image: {
        width: 145,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: theme.palette.secondary.main,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

function DemandeListItem(props) {

    const dispatch = useDispatch();
    const pageCount = useSelector(({ demandesAchat }) => demandesAchat.demandes.pageCount);
    const demandes = useSelector(({ demandesAchat }) => demandesAchat.demandes.data);
    const loading = useSelector(({ demandesAchat }) => demandesAchat.demandes.loading);
    const parametres = useSelector(({ demandesAchat }) => demandesAchat.demandes.parametres);
    const { classes } = props;

    function handlePreviousClick() {
        parametres.page = Math.max(parametres.page - 1, 1);
        dispatch(Actions.setParametresData(parametres))
        document.querySelector('.st').scrollTop = 0;
    }

    function handleNextClick() {
        parametres.page = Math.min(parametres.page + 1, pageCount);
        dispatch(Actions.setParametresData(parametres))
        document.querySelector('.st').scrollTop = 0;
    }

    function handleChangeItems(ev) {
        parametres.page = 1;
        parametres.itemsPerPage = ev.target.value;
        document.querySelector('.st').scrollTop = 0;
        dispatch(Actions.setParametresData(parametres))
    }

    return (
        <div className={classes.root}>
            {
                loading ?
                    generate(
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={100}
                            viewBox="0 0 400 100"
                        >
                            <rect x="4" y="10" rx="0" ry="0" width="133" height="10" />
                            <rect x="4" y="31" rx="0" ry="0" width="216" height="21" />
                            <rect x="4" y="79" rx="2" ry="2" width="43" height="12" />
                            <rect x="10" y="89" rx="2" ry="2" width="43" height="0" />
                            <rect x="72" y="80" rx="2" ry="2" width="43" height="11" />
                            <rect x="120" y="80" rx="2" ry="2" width="43" height="11" />
                            <rect x="4" y="61" rx="0" ry="0" width="44" height="9" />
                            <rect x="350" y="11" rx="0" ry="0" width="46" height="8" />
                        </ContentLoader>,
                    )
                    :
                    (
                        <FuseAnimateGroup enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        >
                            {
                                demandes && demandes.map((demande, index) => (

                                    <Paper className={classes.paper} key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item>

                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography
                                                            component="a"
                                                            href={demande && `/demandes-achat/${demande.id}-${demande.slug}`}
                                                            variant="h6">

                                                            {demande.titre}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {_.capitalize(_.truncate(demande.description, {
                                                                'length': 70
                                                            }))}
                                                        </Typography>

                                                        <Chip
                                                            icon={<Icon className="text-16 mr-0">location_on</Icon>}
                                                            label={demande.ville + ', ' + demande.pays}
                                                            classes={{
                                                                root: clsx("h-24"),
                                                                label: "pl-4 pr-6 py-4 text-11",
                                                                deleteIcon: "w-16 ml-0",
                                                            }}
                                                            className="mr-4"
                                                            variant="outlined"
                                                        />

                                                    </Grid>
                                                    <Grid item>
                                                        Activtés :
                                                        {
                                                            demande.categories && demande.categories.map((item, index) => (
                                                                index < 4 &&
                                                                <Chip
                                                                    label={item.name}
                                                                    classes={{
                                                                        root: "h-24",
                                                                        label: "pl-4 pr-6 py-4 text-11",
                                                                        deleteIcon: "w-16 ml-0",
                                                                    }}
                                                                    key={index}
                                                                    variant="outlined"
                                                                    className="ml-4 h-24"
                                                                />
                                                            ))

                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color='secondary' className="font-600">

                                                        {
                                                            demande.budget ?
                                                                parseFloat(demande.budget).toLocaleString(
                                                                    undefined, // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                ) + (demande.currency ? ' ' + demande.currency.name : '')
                                                                : 'Prix sur demande'
                                                        }
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))
                            }
                            {
                                demandes && (
                                    <Grid container spacing={2} className="justify-between mt-16">
                                        <Grid item xs={12} md={6}>
                                            Montrer:&ensp;
                                            <Select
                                                className="text-13"
                                                native
                                                value={parametres.itemsPerPage}
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
                                            <IconButton aria-label="Previous" className={classes.margin} disabled={parametres.page === 1} onClick={handlePreviousClick}>
                                                <Icon>arrow_back</Icon>
                                            </IconButton>
                                            {parametres.page} / {pageCount}<IconButton aria-label="Next" disabled={parametres.page === pageCount} className={classes.margin} onClick={handleNextClick}>
                                                <Icon>arrow_forward</Icon>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </FuseAnimateGroup>
                    )
            }
        </div>
    );
}

DemandeListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemandeListItem);