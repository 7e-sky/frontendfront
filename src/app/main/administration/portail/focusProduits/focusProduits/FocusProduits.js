import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import FocusProduitsTable from './FocusProduitsTable';
import FocusProduitsHeader from './FocusProduitsHeader';
import reducer from '../store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

function FocusProduits() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(Actions.getProduits());
        return () => {
            dispatch(Actions.cleanUp())
        }

    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <FocusProduitsHeader />
            }
            content={
                <FocusProduitsTable />
            }
            innerScroll
        />
    );
}

export default withReducer('focusProduitsApp', reducer)(FocusProduits);
