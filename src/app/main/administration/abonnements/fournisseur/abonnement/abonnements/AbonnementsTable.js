import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, TextField } from '@material-ui/core';
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
function AbonnementsTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const abonnements = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.data);
    const loading = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.loading);
    const pageCount = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.pageCount);
    const parametres = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.parametres);
    const searchText = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (abonnements) {
            setFilteredData(getFilteredArray(abonnements, searchText));
        }
    }, [abonnements, searchText]);



    if (!filteredData) {
        return null;
    }

    const run = (parametres) =>
        dispatch(Actions.setParametresData(parametres))

    //call run function
    const fn =
        _.debounce(run, 1000);

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64",

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
                        Header: "Référence",
                        className: "font-bold",
                        accessor: "reference",
                        filterable: true,
                        Cell: row => row.original.reference,
                    },
                    {
                        Header: "Offre",
                        className: "font-bold",
                        accessor: "offre.name",
                        filterable: true,
                        Cell: row => row.original.offre ? row.original.offre.name : '',
                    },
                    {
                        Header: "Fournisseur",
                        className: "font-bold",
                        accessor: "fournisseur.societe",
                        filterable: true,
                        Cell: row => row.original.fournisseur ? row.original.fournisseur.societe : '',
                    },
                    {
                        Header: "Mode de paiement",
                        accessor: "mode.name",
                        filterable: true,
                        Cell: row => row.original.mode ? row.original.mode.name : '',
                    },

                    {
                        Header: "Activités",
                        accessor: "sousSecteurs.name",
                        filterable: true,
                        Cell: row =>
                            _.truncate(_.join(_.map(row.original.sousSecteurs, 'name'), ', '), {
                                'length': 25,
                                'separator': ' '
                            })

                    },
                    {
                        Header: "Date de création",
                        accessor: "created",
                        filterable: true,
                        Cell: row => moment(row.original.created).format('DD/MM/YYYY HH:mm'),
                        Filter: ({ filter, onChange }) =>
                            <TextField
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                    },
                    {
                        Header: "Date d'expiration",
                        accessor: "expired",
                        filterable: true,
                        Cell: row =>
                            row.original.expired && moment(row.original.expired).format('DD/MM/YYYY HH:mm') + ' ( ' + moment(row.original.expired).diff(moment(), 'days') + ' j )'
                        , Filter: ({ filter, onChange }) =>
                            <TextField
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                    },
                    {
                        Header: "Statut",
                        accessor: "statut",
                        sortable: false,
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">

                                {

                                    row.original.statut === false
                                        ?
                                        (
                                            !row.original.expired || row.original.expired === undefined
                                                ?
                                                <Chip className={classes.chipOrange} label="En attente" />
                                                :
                                                (
                                                    moment(row.original.expired) >= moment()
                                                        ?
                                                        <Chip className={classes.chip} label="Annulé" />
                                                        :
                                                        <Chip className={classes.chip} label="Expiré" />
                                                )

                                        )
                                        :
                                        (
                                            moment(row.original.expired) >= moment()
                                                ?
                                                <Chip className={classes.chip2} label="En cours" />
                                                :
                                                <Chip className={classes.chip} label="Expiré" />
                                        )

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
                                <option value="2">Annulé</option>
                                <option value="3">Expiré</option>
                            </select>

                    },

                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    (moment(row.original.expired) >= moment() || !row.original.expired) &&
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-orange text-20"
                                            onClick={() =>
                                                props.history.push('/admin/offres/abonnement/' + row.original.id)
                                            }
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }

                                {
                                    row.original.statut === true
                                    &&
                                    (
                                        (moment(row.original.expired).diff(moment(), 'month', true) <= 1 && moment(row.original.expired).diff(moment(), 'month', true) > 0)
                                        &&
                                        <Tooltip title="Renouveler" >
                                            <IconButton
                                                onClick={() => {
                                                    props.history.push('/admin/offres/renouvellement/' + row.original.id + '/1');
                                                }} className="text-teal text-20">
                                                <Icon>autorenew</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    )

                                }

                                {
                                    row.original.statut === true
                                    &&
                                    (
                                        moment(row.original.expired) < moment()
                                        &&
                                        <Tooltip title="Dupliquer" >
                                            <IconButton
                                                onClick={() => {
                                                    props.history.push('/admin/offres/renouvellement/' + row.original.id + '/2');
                                                }} className="text-green-700 text-20">
                                                <Icon>file_copy</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    )

                                }
                            </div>
                        )
                    }
                ]}
                manual
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
                noDataText="Aucune abonnement trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(AbonnementsTable);
