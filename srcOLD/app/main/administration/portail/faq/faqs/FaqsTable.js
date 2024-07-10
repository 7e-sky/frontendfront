import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Actions from '../store/actions';

function FaqsTable(props) {
    const dispatch = useDispatch();
    const faqs = useSelector(({ faqsApp }) => faqsApp.faqs.entities);
    const loading = useSelector(({ faqsApp }) => faqsApp.faqs.loading);
    const searchText = useSelector(({ faqsApp }) => faqsApp.faqs.searchText);

    const [filteredData, setFilteredData] = useState(null);


    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (faqs) {
            setFilteredData(getFilteredArray(faqs, searchText));
        }
    }, [faqs, searchText]);



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
                    Aucun Faq trouvé
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
                                props.history.push('/admin/faqs/' + rowInfo.original.id);
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
                        Header: "Question",
                        filterable: true,
                        accessor: "question",
                    },
                    {
                        Header: "Réponse",
                        filterable: true,
                        accessor: "reponse",
                    },
                    {
                        Header: "Catégorie",
                        filterable: true,
                        id: "categorie",
                        accessor: f => f.categorie ? f.categorie.name : 'N/A'
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
                                            dispatch(Actions.removeFaq(row.original));
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
                noDataText="Aucun faq trouvé"
                loadingText='Chargement...'
                ofText='sur'

            />
        </FuseAnimate>
    );
}

export default withRouter(FaqsTable);
