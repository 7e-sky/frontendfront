import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, Tooltip } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

function FaqCategoriesList(props) {
    const dispatch = useDispatch();
    const categories = useSelector(({ faqCategorieApp }) => faqCategorieApp.faqCategories.entities);
    const loading = useSelector(({ faqCategorieApp }) => faqCategorieApp.faqCategories.loading);
    const searchText = useSelector(({ faqCategorieApp }) => faqCategorieApp.faqCategories.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (categories) {
            setFilteredData(getFilteredArray(categories, searchText));
        }
    }, [categories, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Aucune catégorie trouvée
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
                                dispatch(Actions.openEditFaqCategorieDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[

                    {
                        Header: "Categorie",
                        accessor: "name",
                        filterable: false,
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
                                            dispatch(Actions.removeCategorie(row.original));
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
                noDataText="Aucune catégorie trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default FaqCategoriesList;
