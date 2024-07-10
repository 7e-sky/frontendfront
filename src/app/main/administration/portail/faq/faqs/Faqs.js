import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import FaqsTable from './FaqsTable';
import FaqsHeader from './FaqsHeader';
import reducer from '../store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

function Faqs() {

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(Actions.getFaqs());
    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <FaqsHeader />
            }
            content={
                <FaqsTable />
            }
            innerScroll
        />
    );
}

export default withReducer('faqsApp', reducer)(Faqs);
