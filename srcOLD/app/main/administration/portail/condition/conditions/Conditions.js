import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import ConditionsTable from './ConditionsTable';
import ConditionsHeader from './ConditionsHeader';
import reducer from '../store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

function Conditions() {

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(Actions.getConditions());
    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ConditionsHeader />
            }
            content={
                <ConditionsTable />
            }
            innerScroll
        />
    );
}

export default withReducer('conditionsApp', reducer)(Conditions);
