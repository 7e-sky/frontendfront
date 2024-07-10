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
    const user = useSelector(({ auth }) => auth.user);
    const parametres = useSelector(({ produitsFournisseursApp }) => produitsFournisseursApp.produits.parametres);

    useEffect(() => {
        if (!user.id)
            return
        dispatch(Actions.getProduits(user.id, parametres));

    }, [dispatch, parametres, user]);

    useEffect(() => {
        if (!user.id)
            return;
        dispatch(Actions.getFreeProduits(user));
        return () => {
            dispatch(Actions.cleanUpFree())
        }
    }, [dispatch, user]);


    return (
        <>
            <Helmet>
                <title>Mes produits / services | Les Achats Industriels</title>
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

export default withReducer('produitsFournisseursApp', reducer)(Produits);
