import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import ProduitsTable from './ProduitsTable';
import ProduitsHeader from './ProduitsHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function Produits() {

    const dispatch = useDispatch();
    const parametres = useSelector(({ produitsApp }) => produitsApp.produits.parametres);


    useEffect(() => {
        dispatch(Actions.getProduits(parametres));
        return () => {
            dispatch(Actions.cleanUp())
        }
    }, [dispatch, parametres]);

    return (
        <>
            <Helmet>
                <title>Produits | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex flex-col h-full",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ProduitsHeader />
                }
                content={
                    <ProduitsTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('produitsApp', reducer)(Produits);
