import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';
import ReactTable from "react-table";
import _ from '@lodash';


function MessageTable(props) {

    const dispatch = useDispatch();
    const messages = useSelector(({ messagesFrsApp }) => messagesFrsApp.messages.data);
    const loading = useSelector(({ messagesFrsApp }) => messagesFrsApp.messages.loading);
    const user = useSelector(({ auth }) => auth.user);
    const searchText = useSelector(({ messagesFrsApp }) => messagesFrsApp.messages.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (messages) {
            setFilteredData(getFilteredArray(messages, searchText));
        }
    }, [messages, searchText]);



    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de message!
                </Typography>
            </div>
        );
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
                                    props.history.push('/messages/' + rowInfo.original.id);
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
                            Header: "",
                            filterable: true,
                            Cell: row => (
                                <div className="flex items-center">

                                    {

                                        row.original.isRead
                                            ?
                                            <p className="text-green">Lu</p>
                                            :
                                            <p className="text-orange">No Lu</p>


                                    }

                                </div>
                            )

                        },

                        {
                            Header: "Nom Contact",
                            accessor: "contact",
                            filterable: true,
                            Cell: row => row.original.contact ? row.original.contact : '',
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
                            filterable: false,
                            Cell: row => moment(row.original.created).format('DD/MM/YYYY HH:mm')
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
                                                        dispatch(Actions.removeMessage(row.original, user.id));
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
                    defaultPageSize={10}
                    noDataText="Aucun message trouvé"
                    loading={loading}
                    loadingText='Chargement...'
                    ofText='sur'
                />
            </FuseAnimate>




        </div>
    );
}

export default withRouter(MessageTable);
