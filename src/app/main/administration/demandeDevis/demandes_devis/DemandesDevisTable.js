import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core';
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
function DemandesDevisTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const demandesDevis = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.data);
    const loading = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.loading);
    const pageCount = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.pageCount);
    const parametres = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.parametres);

    const searchText = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.searchText);

    const [filteredData, setFilteredData] = useState(null);

    const run = (parametres) =>
        dispatch(Actions.setParametresData(parametres))

    //call run function
    const fn =
        _.debounce(run, 1000);


    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (demandesDevis) {
            setFilteredData(getFilteredArray(demandesDevis, searchText));
        }
    }, [demandesDevis, searchText]);



    if (!filteredData) {
        return null;
    }




    return (
        <div className="w-full flex flex-col">


            <FuseAnimate animation="transition.slideUpIn" delay={300}>

                <ReactTable

                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64 cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    props.history.push('/demandes_devis/' + rowInfo.original.id);
                                }
                            }
                        }
                    }}
                    getTheadProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64",

                        }
                    }}

                    data={filteredData}
                    columns={[

                        {
                            Header: "Fournisseur",
                            className: "font-bold",
                            accessor: "fournisseur",
                            filterable: true,
                            Cell: row => row.original.fournisseur ? row.original.fournisseur.societe : '',
                        },
                        {
                            Header: "Produit réf.",
                            className: "font-bold",
                            accessor: "produit.reference",
                            filterable: true,
                            Cell: row => row.original.produit ? row.original.produit.reference : '',

                        },
                        {
                            Header: "Quantité",
                            accessor: "quantity",
                            filterable: true,
                            Cell: row => row.original.quantity ? row.original.quantity : '',
                        },
                        {
                            Header: "Nom Contact",
                            accessor: "contact",
                            filterable: true,
                            Cell: row => row.original.contact ? row.original.contact : '',

                        },
                        {
                            Header: "Société",
                            accessor: "societe",
                            filterable: true,
                            Cell: row => row.original.societe ? row.original.societe : '',
                        },
                        {
                            Header: "Téléphone",
                            accessor: "phone",
                            filterable: true,
                            Cell: row => row.original.phone ? row.original.phone : '',
                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            filterable: true,
                            Cell: row => row.original.email ? row.original.email : '',

                        },
                        {
                            Header: "Adresse",
                            accessor: "adresse",
                            filterable: true,
                            Cell: row => row.original.adresse ? row.original.adresse : '',
                        },
                        {
                            Header: "Message",
                            accessor: "message",
                            filterable: true,
                            Cell: row =>
                                _.truncate(row.original.message, {
                                    'length': 36,
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
                                />,
                        },
                        {
                            Header: "",
                            Cell: row => (
                                <div className="flex items-center">
                                    {
                                        row.original.statut !== 1 ?

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
                                                                        <Button variant="contained" onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                                            Non
                                                                        </Button>
                                                                        <Button onClick={(ev) => {
                                                                            dispatch(Actions.removeDemande(row.original, parametres));
                                                                            dispatch(Actions.closeDialog())
                                                                        }} color="primary" autoFocus>
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




        </div>
    );
}

export default withRouter(DemandesDevisTable);
