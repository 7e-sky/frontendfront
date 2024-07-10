import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import SecteursTable from './SecteursTable';
import SecteursHeader from './SecteursHeader';
import reducer from '../store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function Secteurs() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getSecteurs());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Secteurs | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex flex-col h-full",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <SecteursHeader />
                }
                content={
                    <SecteursTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('secteursApp', reducer)(Secteurs);
