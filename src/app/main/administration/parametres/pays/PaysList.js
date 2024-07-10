import React, { useEffect, useState } from 'react';
import { Icon, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import _ from '@lodash';
import * as Actions from './store/actions';

function PaysList(props) {
    const dispatch = useDispatch();
    const pays = useSelector(({ paysApp }) => paysApp.pays.entities);
    const pageCount = useSelector(({ paysApp }) => paysApp.pays.pageCount);
    const loading = useSelector(({ paysApp }) => paysApp.pays.loading);
    const parametres = useSelector(({ paysApp }) => paysApp.pays.parametres);

    // const selectedPaysIds = useSelector(({paysApp}) => paysApp.pays.selectedPaysIds);
    const searchText = useSelector(({ paysApp }) => paysApp.pays.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (pays) {
            setFilteredData(getFilteredArray(pays, searchText));
        }
    }, [pays, searchText]);



    if (!filteredData) {
        return null;
    }



    //dispatch from function filter
    const run = (parametres) => (
        dispatch(Actions.setParametresData(parametres))
    )

    //call run function
    const fn =
        _.debounce(run, 700);
    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>

            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditPaysDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                    {
                        Header: "Pays",
                        accessor: "name",
                        filterable: true,
                    },
                    /*       
                    {
                        Header    : "Villes",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucune ville' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.name} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    },
                    {
                        Header    : "Fournisseurs",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun fournisseurs' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    }, 
                    {
                        Header    : "Acheteurs",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun acheteurs' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    },
                    {
                        Header    : "Admin Commercials",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.zones, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun admin commercial' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.zones, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.zones, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    }, 
                    */
                    {
                        Header: "",
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
                                                            Voulez vous vraiment supprimer cet enregistrement ?
                                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                            Non
                                                    </Button>
                                                        <Button onClick={(ev) => {
                                                            dispatch(Actions.removePays(row.original, parametres));
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
                noDataText="Aucun pays trouvé"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default PaysList;
