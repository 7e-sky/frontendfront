import React from 'react';
import {TableHead, TableSortLabel, TableCell, TableRow, Tooltip} from '@material-ui/core';

const rows = [
    {
        id            : 'image',
        align         : 'left',
        disablePadding: true,
        label         : '',
        sort          : false
    },
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'NOM & Prénom',
        sort          : true
    },
    {
        id            : 'phone',
        align         : 'left',
        disablePadding: false,
        label         : 'Téléphone',
        sort          : true
    },
    {
        id            : 'created',
        align         : 'right',
        disablePadding: false,
        label         : 'Date de création',
        sort          : true
    },
    
    {
        id            : 'active',
        align         : 'right',
        disablePadding: false,
        label         : 'Active',
        sort          : true
    }
];



function AdminsTableHead(props)
{

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow className="h-64">
                
                {rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default AdminsTableHead;
