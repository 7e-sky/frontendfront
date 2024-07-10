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
        padding: 2,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20


    },
    blue: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#3490dc',
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
function CommandesTable(props) {

    const classes = useStyles();
    const commandes = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.commandes.data);
    const loading = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.commandes.loading);
    const searchText = useSelector(({ abonnementFrsApp }) => abonnementFrsApp.commandes.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (commandes) {
            setFilteredData(getFilteredArray(commandes, searchText));
        }
    }, [commandes, searchText]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Chargement...
                </Typography>
            </div>
        );
    }

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Aucune commande en attente !
                </Typography>
            </div>
        );
    }


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
                        sortable: false,
                        id: "reference",
                        accessor: f => f.reference,
                    },
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
                        sortable: false,
                        filterable: false,
                        Cell: row =>
                            _.truncate(_.join(_.map(row.original.sousSecteurs, 'name'), ', '), {
                                'length': 25,
                                'separator': ' '
                            })

                    },
                    {
                        Header: "Durée",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    row.original.duree
                                        ?
                                        row.original.duree.name + ' mois'
                                        :
                                        ''
                                }
                            </div>
                        )

                    },
                    {
                        Header: "Date de création",
                        accessor: "created",
                        sortable: false,
                        filterable: false,
                        Cell: row => moment(row.original.created).format('DD/MM/YYYY')
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
                                        <Chip className={classes.chipOrange} label="En attente" />
                                        :
                                        <Chip className={classes.chip2} label="Traitée" />


                                }

                            </div>
                        )

                    },

                    {
                        Header: "",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    row.original.type === false
                                        ?
                                        <Chip className={classes.blue} label="Nouvelle" />
                                        :
                                        <Chip className={classes.chip2} label="Renouvellement" />

                                }

                            </div>
                        )

                    },


                    {
                        Header: "",
                        width: 64,
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.statut === false
                                    ?
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-orange text-20"
                                            onClick={() =>
                                                props.history.push('/offres/commande/' + row.original.id)
                                            }
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-grey text-20">
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }


                            </div>
                        )
                    }
                ]}
                showPagination={false}
                defaultPageSize={1}
                loading={loading}
                showPageSizeOptions={false}
                noDataText="Pas de commande trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(CommandesTable);
