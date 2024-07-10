import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, TextField, InputAdornment } from '@material-ui/core';
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
function ConsultationsTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const consultations = useSelector(({ consultationsFrsApp }) => consultationsFrsApp.consultations.data);
    const loading = useSelector(({ consultationsFrsApp }) => consultationsFrsApp.consultations.loading);
    const pageCount = useSelector(({ consultationsFrsApp }) => consultationsFrsApp.consultations.pageCount);
    const parametres = useSelector(({ consultationsFrsApp }) => consultationsFrsApp.consultations.parametres);

    const searchText = useSelector(({ consultationsFrsApp }) => consultationsFrsApp.consultations.searchText);

    const [filteredData, setFilteredData] = useState(null);
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (consultations) {
            setFilteredData(getFilteredArray(consultations, searchText));
        }
    }, [consultations, searchText]);



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
                                props.history.push('/consultations/' + rowInfo.original.id);
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
                        Header: "Référence",
                        className: "font-bold",
                        filterable: true,
                        accessor: "demande.reference",
                        Cell: row => row.original.demande.reference ? 'RFQ-' + row.original.demande.reference : 'En attente',
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
                        Header: "État",
                        sortable: false,
                        accessor: "demande.statut",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    moment(row.original.demande.dateExpiration) >= moment()
                                        ?
                                        row.original.demande.statut === 0
                                            ?
                                            <strong className="text-orange">En attente</strong>
                                            :
                                            (row.original.demande.statut === 1 ?
                                                <strong className="text-green">En cours</strong>
                                                :
                                                <Chip className={classes.chip} label="Refusée" />
                                            )
                                        :
                                        <strong className="text-red">Expirée</strong>

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
                                <option value="1">En cours</option>
                                <option value="3">Expirée</option>
                            </select>


                    },
                    {
                        Header: "Affectée à",
                        className: "font-bold",
                        filterable: true,
                        accessor: "personnel.name",
                        Cell: row => row.original.personnel ? row.original.personnel.name : ''
                    },
                    {
                        Header: "Budget",
                        className: "font-bold",
                        accessor: "budget",
                        sortable: false,
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    row.original.budget
                                }
                                &ensp;
                                {
                                    user.data && user.data.currency ? user.data.currency : ''
                                }
                            </div>
                        )

                    },

                    {
                        Header: "Societé",
                        accessor: "demande.acheteur.societe",
                        sortable: false,
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">

                                {row.original.demande.acheteur.societe}
                                <Tooltip title={row.original.demande.acheteur.firstName + ' ' + row.original.demande.acheteur.lastName} >
                                    <Icon>account_circle</Icon>
                                </Tooltip>

                            </div>
                        )

                    },
                    {
                        Header: "Description",
                        accessor: "demande.description",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {_.capitalize(_.truncate(row.original.demande.description, {
                                    'length': 15,
                                    'separator': ' '
                                }))}
                            </div>
                        )
                    },

                    {
                        Header: "Date d'expiration",
                        accessor: "demande.dateExpiration",
                        minWidth: 125,
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    moment(row.original.demande.dateExpiration).format('DD/MM/YYYY')

                                }

                                {
                                    moment(row.original.demande.dateExpiration) >= moment()
                                        ?

                                        <Chip className={classes.chip2} label={moment(row.original.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.demande.dateExpiration).diff(moment(), 'days') + ' j'} />
                                        :
                                        <Chip className={classes.chip} label={moment(row.original.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.demande.dateExpiration).diff(moment(), 'days') + ' j'} />

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
                                    row.original.statut === 0 ?
                                        <Chip className={classes.chipOrange} label="En cours" />
                                        : row.original.statut === 1 ?
                                            <Chip className={classes.chip2} label="Gagnée" />
                                            :
                                            <Chip className={classes.chip} label="Perdue" />

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
                                <option value="0">En cours</option>
                                <option value="1">Gagnée</option>
                                <option value="2">Perdue</option>
                            </select>

                    },
                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    <Tooltip title="Détails" >
                                        <IconButton className="text-teal text-20">
                                            <Icon>remove_red_eye</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }
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
                noDataText="Aucune consultation trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(ConsultationsTable);
