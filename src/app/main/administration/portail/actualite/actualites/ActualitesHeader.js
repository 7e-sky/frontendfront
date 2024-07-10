import React from 'react';
import {Paper, Button, Input, Icon, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';

function ActualitesHeader(props)
{
    const dispatch = useDispatch();
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
    const parametres = useSelector(({ actualiteApp }) => actualiteApp.actualites.parametres);
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">inbox</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Gestion des actualités</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Rechercher dans la description"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={parametres.description}
                                inputProps={{
                                    'aria-label': 'Rechercher'
                                }}
                                onChange={ev => {
                                    parametres.page = 1;
                                    parametres.description=ev.target.value
                                    dispatch(Actions.setParametresData(parametres))
                                }}
                            />
                        </Paper>
                    </FuseAnimate>
                </ThemeProvider>

            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/admin/actualites/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Ajouter nouvelle actualité</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
        </div>
    );
}

export default ActualitesHeader;
