import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function PaysMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedPaysIds = useSelector(({paysApp}) => paysApp.pays.selectedPaysIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedPaysMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedPaysMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedPaysMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedPaysMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedPaysMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedPaysMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removePayss(selectedPaysIds));
                            closeSelectedPaysMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Supprimer"/>
                    </MenuItem>
                    
                   
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}

export default PaysMultiSelectMenu;

