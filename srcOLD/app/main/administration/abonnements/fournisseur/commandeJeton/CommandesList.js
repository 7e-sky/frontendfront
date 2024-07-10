import React, { useEffect, useState } from 'react';
import { Icon, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip, TextField } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({

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
function CommandesList(props) {
    const dispatch = useDispatch();
    const Commandes = useSelector(({ commandesApp }) => commandesApp.commandes.entities);
    const searchText = useSelector(({ commandesApp }) => commandesApp.commandes.searchText);
    const classes = useStyles();
    const parametres = useSelector(({ commandesApp }) => commandesApp.commandes.parametres);
    const loading = useSelector(({ commandesApp }) => commandesApp.commandes.loading);
    const pageCount = useSelector(({ commandesApp }) => commandesApp.commandes.pageCount);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (Commandes) {
            setFilteredData(getFilteredArray(Commandes, searchText));
        }
    }, [Commandes, searchText]);


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
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditCommandesDialog(rowInfo.original));
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
                        Header: "Nombre de jetons",
                        filterable: true,
                        accessor: "nbrJeton",
                    },
                    {
                        Header: "Fournisseur",
                        filterable: true,
                        className: "font-bold",
                        accessor: "fournisseur.societe",
                        Cell: row => row.original.fournisseur ? row.original.fournisseur.societe : '',
                    },
                    {
                        Header: "Etat",
                        accessor: "isUse",
                        filterable: true,
                        Cell: row => row.original.isUse ?
                            <Chip className={classes.chip2} label="Traitée" /> :
                            <Chip className={classes.chipOrange} label="En attente" />,
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
                        Header: "",
                        sortable: false,
                        width: 64,
                        Cell: row => (
                            <div className="flex items-center">

                                <IconButton className="text-red text-20"
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openDialog({
                                            children: (
                                                <React.Fragment>
                                                    <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            {
                                                                !row.original.isUse ?
                                                                    'Voulez vous vraiment supprimer cet enregistrement ?'
                                                                    :
                                                                    'Vous ne pouvez pas supprimer cet enregistrement, car il est traité!'
                                                            }
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                            Non
                                                    </Button>
                                                        {
                                                            !row.original.isUse ?
                                                                <Button
                                                                    onClick={(ev) => {
                                                                        dispatch(Actions.removeCommande(row.original, parametres));
                                                                        dispatch(Actions.closeDialog())
                                                                    }} color="primary"
                                                                    autoFocus>
                                                                    Oui
                                                                </Button>
                                                                :
                                                                <Button
                                                                    disabled
                                                                    color="primary"
                                                                    autoFocus>
                                                                    Oui
                                                                </Button>
                                                        }

                                                    </DialogActions>
                                                </React.Fragment>
                                            )
                                        }))
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
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
                noDataText="Aucune commande trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default CommandesList;
