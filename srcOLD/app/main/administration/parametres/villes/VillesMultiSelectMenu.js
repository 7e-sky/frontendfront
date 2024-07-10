import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function VillesMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedVillesIds = useSelector(({villesApp}) => villesApp.villes.selectedVillesIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedVillesMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedVillesMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedVillesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedVillesMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedVillesMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedVillesMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeVille(selectedVillesIds));
                            closeSelectedVillesMenu();
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

export default VillesMultiSelectMenu;

