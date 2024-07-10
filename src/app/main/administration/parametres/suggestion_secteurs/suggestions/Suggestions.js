import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import SuggestionsTable from './SuggestionsTable';
import SuggestionsHeader from './SuggestionsHeader';
import reducer from '../store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function Suggestions() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getSuggestions());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Suggestions secteurs | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex flex-col h-full",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <SuggestionsHeader />
                }
                content={
                    <SuggestionsTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('suggestionsApp', reducer)(Suggestions);
