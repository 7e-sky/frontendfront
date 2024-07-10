import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch,useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import CategorieList from './CategorieList';
import CategorieHeader from './CategorieHeader';
import CategorieDialog from './CategorieDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";


function CategorieApp(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);
    const parametres = useSelector(({categoriesApp}) => categoriesApp.categories.parametres);
    const sousSecteurs = useSelector(({categoriesApp}) => categoriesApp.categories.sousSecteurs);

    useEffect(() => {
        dispatch(Actions.getCategories(parametres));

    }, [dispatch,parametres]);
    useEffect(() => {
        if(!sousSecteurs)
        dispatch(Actions.getSousSecteurs());
    }, [dispatch,sousSecteurs]);

    return (
        <React.Fragment>
             <Helmet>
                <title>Produits | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <CategorieHeader pageLayout={pageLayout}/>
                }
                content={
                    <CategorieList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <CategorieDialog/>
        </React.Fragment>
    )
}

export default withReducer('categoriesApp', reducer)(CategorieApp);
