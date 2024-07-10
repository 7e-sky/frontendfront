import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SecteursMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedSecteursIds = useSelector(({secteursApp}) => secteursApp.secteurs.selectedSecteursIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedSecteursMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedSecteursMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedSecteursMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedSecteursMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedSecteursMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedSecteursMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeSecteur(selectedSecteursIds));
                            closeSelectedSecteursMenu();
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

export default SecteursMultiSelectMenu;

