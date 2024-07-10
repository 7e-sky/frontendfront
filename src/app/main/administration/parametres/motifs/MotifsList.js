import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

function MotifsList(props) {
    const dispatch = useDispatch();
    const Motifs = useSelector(({ motifsApp }) => motifsApp.motifs.entities);
    const searchText = useSelector(({ motifsApp }) => motifsApp.motifs.searchText);
    
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (Motifs) {
            setFilteredData(getFilteredArray(Motifs, searchText));
        }
    }, [Motifs, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de Motifs!
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
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditMotifsDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[

                    {
                        Header: "Id",
                        accessor: "id",
                        filterable: false,
                    },
                    {
                        Header: "Désingnation",
                        accessor: "name",
                        filterable: true,
                    },

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

                                                            'Voulez vous vraiment supprimer cet enregistrement ?'
                                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                            Non
                                                        </Button>
                                                        <Button
                                                            onClick={(ev) => {
                                                                dispatch(Actions.removeMotif(row.original));
                                                                dispatch(Actions.closeDialog())
                                                            }}
                                                            color="primary"
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
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}

                noDataText="No Motif found"
            />
        </FuseAnimate>
    );
}

export default MotifsList;
