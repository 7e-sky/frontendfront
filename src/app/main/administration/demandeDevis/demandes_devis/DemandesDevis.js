import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import DemandesDevisTable from './DemandesDevisTable';
import DemandesDevisHeader from './DemandesDevisHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function DemandesDevis() {

    const dispatch = useDispatch();
    const parametres = useSelector(({ demandesDevisApp }) => demandesDevisApp.demandesDevis.parametres);


    useEffect(() => {
        dispatch(Actions.getDemandesNoTraites(parametres));
        return () => {
            dispatch(Actions.cleanUp())
        }
    }, [dispatch, parametres]);

    return (
        <>
            <Helmet>
                <title>Demandes devis | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <DemandesDevisHeader />
                }
                content={
                    <DemandesDevisTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('demandesDevisApp', reducer)(DemandesDevis);
