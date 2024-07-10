import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, TextField, InputAdornment, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';
import ReactTable from "react-table";
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    chip: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20


    },
    chip2: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20
    },
    chipOrange: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#ff9800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20

    },
}));
function DemandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const demandes = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.data);
    const loading = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.loading);
    const pageCount = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.pageCount);
    const parametres = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.parametres);
    const user = useSelector(({ auth }) => auth.user);

    const searchText = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (demandes) {
            setFilteredData(getFilteredArray(demandes, searchText));
        }
    }, [demandes, searchText]);



    if (!filteredData) {
        return null;
    }

    //dispatch from function filter
    const run = (parametres) => (
        dispatch(Actions.setParametresData(parametres))
    )

    //call run function
    const fn =
        _.debounce(run, 1000);


    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                props.history.push('/demandes/' + rowInfo.original.id);
                            }
                        }
                    }
                }}
                getTheadProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 font-bold",

                    }
                }}

                data={filteredData}
                columns={[
                    {
                        accessor: "statut",
                        Header: "Statut",
                        filterable: true,
                        sortable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    row.original.statut === 3 ?
                                        <Chip className={classes.chip2} label="Adjugé" /> :
                                        moment(row.original.dateExpiration) >= moment()
                                            ?
                                            row.original.statut === 0
                                                ?
                                                <Chip className={classes.chipOrange} label="En attente" />
                                                :
                                                (row.original.statut === 1 ? <Chip className={classes.chip2} label="En cours" />
                                                    :
                                                    <Chip className={classes.chip} label="Refusée" />
                                                )
                                            :
                                            <Chip className={classes.chip} label="Expiré" />

                                }

                            </div>
                        ),
                        Filter: ({ filter, onChange }) =>
                            <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                            >
                                <option value="">Tous</option>
                                <option value="0">En attente</option>
                                <option value="1">En cours</option>
                                <option value="2">Refusée</option>
                                <option value="3">Adjugée</option>
                                <option value="4">Expirée</option>
                            </select>

                    },
                    {
                        Header: "Référence",
                        className: "font-bold",
                        filterable: true,
                        accessor: "reference",
                        Cell: row => row.original.reference ? 'RFQ-' + row.original.reference : 'En attente',
                        Filter: ({ filter, onChange }) =>
                            <TextField
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">RFQ-</InputAdornment>,
                                }}
                            />
                        ,
                    },
                    {
                        Header: "Titre",
                        accessor: "titre",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {_.capitalize(_.truncate(row.original.titre, {
                                    'length': 15,
                                    'separator': ' '
                                }))}
                            </div>
                        )
                    },
                    {
                        Header: "Activités",
                        filterable: true,
                        accessor: "categories.name",
                        Cell: row =>
                            _.truncate(_.join(_.map(row.original.categories, 'name'), ', '), {
                                'length': 15,
                                'separator': ' '
                            })

                    },
                    {
                        Header: "Budget",
                        filterable: true,
                        accessor: "budget",
                        Cell: row =>
                            (
                                <>
                                    {
                                        parseFloat(row.original.budget).toLocaleString(
                                            'fr', // leave undefined to use the browser's locale,
                                            // or use a string like 'en-US' to override it.
                                            { minimumFractionDigits: 2 }
                                        )
                                    }
                                    &ensp;
                                    {
                                        row.original.currency && row.original.currency.name
                                    }
                                </>
                            )

                    },
                    {
                        Header: "Publiée",
                        filterable: true,
                        accessor: "isPublic",
                        Cell: row =>
                            row.original.isPublic ?
                                (
                                    <Tooltip title="Publiée">
                                        <IconButton className="text-green text-20" onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.PublishDemande(row.original, false, parametres, user.id))

                                        }}>
                                            <Icon>check_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                ) :
                                (
                                    <Tooltip title="Privée">
                                        <IconButton className="text-red text-20" onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.PublishDemande(row.original, true, parametres, user.id))

                                        }} >
                                            <Icon>remove_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                ),
                        Filter: ({ filter, onChange }) =>
                            <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                            >
                                <option value="">Tous</option>
                                <option value="true">Publiée</option>
                                <option value="false">Privée</option>
                            </select>


                    },

                    {
                        Header: "Échéance",
                        accessor: "dateExpiration",
                        filterable: true,
                        minWidth: 125,
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    moment(row.original.dateExpiration).format('DD/MM/YYYY')

                                }

                                {
                                    moment(row.original.dateExpiration) >= moment()
                                        ?

                                        <Chip className={classes.chip2} label={moment(row.original.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.dateExpiration).diff(moment(), 'days') + ' j'} />
                                        :
                                        <Chip className={classes.chip} label={moment(row.original.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.dateExpiration).diff(moment(), 'days') + ' j'} />

                                }

                            </div>
                        ),
                        Filter: ({ filter, onChange }) =>
                            <TextField
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />,

                    },
                    {
                        Header: "Date de création",
                        accessor: "created",
                        filterable: true,
                        Cell: row => moment(row.original.created).format('DD/MM/YYYY'),
                        Filter: ({ filter, onChange }) =>
                            <TextField
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />,
                    },
                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    row.original.statut !== 1 && row.original.diffusionsdemandes.length === 0 ?
                                        <Tooltip title="Supprimer" >
                                            <IconButton className="text-red text-20"
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    dispatch(Actions.openDialog({
                                                        children: (
                                                            <React.Fragment>
                                                                <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText id="alert-dialog-description">
                                                                        Voulez vous vraiment supprimer cette demande ?
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button variant="outlined" onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                                        Non
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={(ev) => {
                                                                            dispatch(Actions.removeDemande(row.original, parametres, user.id));
                                                                            dispatch(Actions.closeDialog())
                                                                        }}
                                                                        autoFocus>
                                                                        Oui
                                                                </Button>

                                                                </DialogActions>
                                                            </React.Fragment>
                                                        )
                                                    }))
                                                }}
                                            >
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </Tooltip>
                                        : <Tooltip title="Interdit!" >
                                            <IconButton className="text-20 cursor-not-allowed disable"
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                }}

                                            >
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </Tooltip>
                                }
                                <Tooltip title="Détails" >
                                    <IconButton className="text-teal text-20">
                                        <Icon>remove_red_eye</Icon>
                                    </IconButton>
                                </Tooltip>


                            </div>
                        )
                    }
                ]}
                manual

                defaultSortDesc={true}
                pages={pageCount}
                page={parametres.page - 1}
                defaultPageSize={10}
                loading={loading}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                    parametres.page = pageIndex + 1;
                    dispatch(Actions.setParametresData(parametres))
                }}

                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id = newSorted[0].id;
                    parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                    dispatch(Actions.setParametresData(parametres))
                }}
                onFilteredChange={filtered => {
                    parametres.page = 1;
                    parametres.search = filtered;
                    fn(parametres);
                }}
                noDataText="Aucune demande trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(DemandesTable);
