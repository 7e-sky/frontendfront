import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Actions from '../store/actions';

function ConditionsTable(props) {
    const dispatch = useDispatch();
    const conditions = useSelector(({ conditionsApp }) => conditionsApp.conditions.entities);
    const loading = useSelector(({ conditionsApp }) => conditionsApp.conditions.loading);
    const searchText = useSelector(({ conditionsApp }) => conditionsApp.conditions.searchText);

    const [filteredData, setFilteredData] = useState(null);


    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (conditions) {
            setFilteredData(getFilteredArray(conditions, searchText));
        }
    }, [conditions, searchText]);



    if (!filteredData) {
        return null;
    }
    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <CircularProgress color="secondary" /> &ensp;
               Chargement ...
            </div>
        );
    }
    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Aucun Condition trouvé
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
                        className: "h-64 cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                props.history.push('/admin/conditions/' + rowInfo.original.id);
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
                        Header: "titre",
                        filterable: true,
                        accessor: "titre",
                    },
                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                <Tooltip title="Editer" >
                                    <IconButton className="text-teal text-20">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Supprimer" >
                                    <IconButton className="text-red text-20"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.removeCondition(row.original));
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </Tooltip>

                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                loading={loading}
                noDataText="Aucun condition trouvé"
                loadingText='Chargement...'
                ofText='sur'

            />
        </FuseAnimate>
    );
}

export default withRouter(ConditionsTable);
