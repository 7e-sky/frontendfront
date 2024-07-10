import React from 'react';
import { Icon,  Input, Paper, Typography, Button} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

function FaqCategoriesHeader(props)
{
    const dispatch = useDispatch();
    const searchText = useSelector(({faqCategorieApp}) => faqCategorieApp.faqCategories.searchText);
    const loading = useSelector(({faqCategorieApp}) => faqCategorieApp.faqCategories.loading);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);

    return (
         <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex items-center">
                   
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">Gestion des Categories de Faq</Typography>
                    </FuseAnimate>
                </div>

                <div className="flex flex-1 items-center justify-center px-12">

                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Rechercher..."
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => {
                                         dispatch(Actions.setSearchText(ev))
                                    }}
                                />
                            </Paper>
                        </FuseAnimate>
                    </ThemeProvider>
                    

                </div>
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button disabled={loading} onClick={ev => dispatch(Actions.openNewFaqCategorieDialog())} className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">Ajouter nouvelle categorie</span>
                        <span className="flex sm:hidden">New</span>
                    </Button>
                </FuseAnimate>
            </div>

        
    );
}

export default FaqCategoriesHeader;
