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
    blue: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#3490dc',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20


    },
}));
function CommandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const commandes = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.data);
    const loading = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.loading);
    const pageCount = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.pageCount);
    const parametres = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.parametres);
    const searchText = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.searchText);

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
                        Header: "Statut",
                        accessor: "statut",
                        sortable: false,
                        filterable: true,
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
                        ),
                        Filter: ({ filter, onChange }) =>
                            <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                            >
                                <option value="">Tous</option>
                                <option value="true">Traitée</option>
                                <option value="false">En attente</option>
                            </select>

                    },
                    {
                        Header: "",
                        sortable: false,
                        accessor: "type",
                        filterable: true,
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
                        ),
                        Filter: ({ filter, onChange }) =>
                            <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                            >
                                <option value="">Tous</option>
                                <option value="false">Nouvelle</option>
                                <option value="true">Renouvellement</option>
                            </select>

                    },


                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.statut === false
                                    ?
                                    <Tooltip title="Traiter" >
                                        <IconButton className="text-blue text-20"
                                            onClick={() =>
                                                props.history.push('/admin/offres/commande/' + row.original.id)
                                            }
                                        >
                                            <Icon>send</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Déjà traitée" >
                                        <IconButton className="text-grey text-20">
                                            <Icon>send</Icon>
                                        </IconButton>
                                    </Tooltip>
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
                noDataText="Aucune commande trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(CommandesTable);
