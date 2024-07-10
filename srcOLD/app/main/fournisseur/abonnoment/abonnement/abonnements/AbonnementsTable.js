import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
    chip2: {
        marginLeft: theme.spacing(1),
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
    },
    chipOrange: {
        marginLeft: theme.spacing(1),
        background: '#ff9800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
    },
}));
function AbonnementsTable(props) {

    const classes = useStyles();
    const abonnements = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.abonnements.data);
    const loading = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.abonnements.loading);
    const searchText = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.abonnements.searchText);

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



    return (
        <>
            <Typography variant="h6" className="mb-16"> Abonnement actuel</Typography>

            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight sm:rounded-16 overflow-hidden"
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
                            Header: "Offre",
                            className: "font-bold",
                            sortable: false,
                            id: "offre",
                            accessor: f => f.offre.name,
                        },

                        {
                            Header: "Activités",
                            accessor: "sousSecteurs.name",
                            className: "text-center",
                            sortable: false,
                            filterable: false,
                            Cell: row =>
                                _.truncate(_.join(_.map(row.original.sousSecteurs, 'name'), ', '), {
                                    'length': 150,
                                    'separator': ' '
                                })

                        },
                        {
                            Header: "Date de création",
                            className: "text-center",
                            accessor: "created",
                            sortable: false,
                            filterable: false,
                            Cell: row => moment(row.original.created).format('DD/MM/YYYY')
                        },
                        {
                            Header: "Date de renouvellement",
                            className: "text-center",
                            sortable: false,
                            accessor: "expired",
                            filterable: false,
                            Cell: row => (
                                row.original.expired &&
                                moment(row.original.expired).format('DD/MM/YYYY')
                            )
                        },
                        {
                            Header: "Statut",
                            sortable: false,
                            filterable: false,
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
                                                            <Chip className={classes.chip} label="Annulée" />
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
                            )

                        },
                        {
                            Header: "",
                            Cell: row => (
                                <div className="flex items-center">
                                    {
                                        <Tooltip title="Détails" >
                                            <IconButton
                                                onClick={() => {
                                                    props.history.push('/abonnement/' + row.original.id);
                                                }} className="text-teal text-20">
                                                <Icon>remove_red_eye</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    }

                                    {
                                        row.original.statut === true
                                        &&
                                        (
                                            (moment(row.original.expired).diff(moment(), 'month', true) <= 1)
                                            &&
                                            <Tooltip title="Renouveler" >
                                                <IconButton
                                                    onClick={() => {
                                                        props.history.push('/renouveler/' + row.original.id);
                                                    }} className="text-green text-20">
                                                    <Icon>autorenew</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        )

                                    }
                                </div>
                            )
                        }
                    ]}
                    showPagination={false}
                    defaultPageSize={1}
                    loading={loading}
                    showPageSizeOptions={false}
                    noDataText="Pas d'abonnement trouvé"
                    loadingText='Chargement...'
                    ofText='sur'
                />
            </FuseAnimate>
        </>
    );
}

export default withRouter(AbonnementsTable);
