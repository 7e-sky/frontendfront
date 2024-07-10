import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import ContactsFournisseurTable from './ContactsFournisseurTable';
import ContactsFournisseurHeader from './ContactsFournisseurHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function ContactsFournisseur() {

    const dispatch = useDispatch();
    const parametres = useSelector(({ contactsFournisseurApp }) => contactsFournisseurApp.contactsFournisseur.parametres);


    useEffect(() => {
        dispatch(Actions.getMessages(parametres));
    }, [dispatch, parametres]);

    return (
        <>
            <Helmet>
                <title>Messages fournisseurs | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ContactsFournisseurHeader />
                }
                content={
                    <ContactsFournisseurTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('contactsFournisseurApp', reducer)(ContactsFournisseur);
