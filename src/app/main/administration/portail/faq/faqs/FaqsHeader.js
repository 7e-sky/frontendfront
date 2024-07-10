import React from 'react';
import { Paper, Input, Icon, Typography, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Link } from 'react-router-dom';

function FaqsHeader(props) {
    const dispatch = useDispatch();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const searchText = useSelector(({faqsApp}) => faqsApp.faqs.searchText);

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">help_outline</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Gestion des Faqs</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Rechercher"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={ev => dispatch(Actions.setSearchText(ev))}
                            />
                        </Paper>
                    </FuseAnimate>
                </ThemeProvider>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/admin/faqs/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Ajouter</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
        </div>
    );
}

export default FaqsHeader;
