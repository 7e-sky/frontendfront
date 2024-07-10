import React, { useEffect, useState } from 'react';
import { Icon, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import _ from '@lodash';

function VillesList(props) {
    const dispatch = useDispatch();
    const Villes = useSelector(({ villesApp }) => villesApp.villes.entities);
    const pageCount = useSelector(({ villesApp }) => villesApp.villes.pageCount);
    const loading = useSelector(({ villesApp }) => villesApp.villes.loading);
    const parametres = useSelector(({ villesApp }) => villesApp.villes.parametres);
    const searchText = useSelector(({ villesApp }) => villesApp.villes.searchText);


    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        dispatch(Actions.getPays());
    }, [dispatch]);
    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (Villes) {
            setFilteredData(getFilteredArray(Villes, searchText));
        }
    }, [Villes, searchText]);

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
                                dispatch(Actions.openEditVillesDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[

                    {
                        Header: "Villes",
                        accessor: "name",
                        filterable: true,
                    },
                    {
                        Header: "Pays",
                        accessor: "pays.name",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.pays ? row.original.pays.name : ''}
                            </div>
                        )
                    },
                    /*  {
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
                          Header    : "Commercials",
                          sortable: false,                        
                          className : "font-bold",
                          Cell  : row => (
                              <div className="flex items-center">
                                 <HtmlTooltip
                                      title={
                                      <React.Fragment>
                                          
                                          {
                                              
                                              Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun commercial' : 
                                              <ul> 
                                              { 
                                                  _.map(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del'), function(value, key) {
                                                  return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                  })
                                              }
                                            </ul>
                                          }
                                         
                                      </React.Fragment>
                                      }
                                  >
                                      <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                          {Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length}
                                      </Button>
                                  </HtmlTooltip>
                                 
                              </div>
                          )
                      },   */
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
                                                            dispatch(Actions.removeVille(row.original));
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
                noDataText="No ville found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default VillesList;
