import React, { useEffect, useRef } from 'react';
import { FusePageSimple } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import HeaderCondition from './HeaderCondition';
import ConditionsSidebarContent from './ConditionsSidebarContent';
import CondtionDetail from './CondtionDetail';
import { Helmet } from "react-helmet";

function ConditionsApp(props) {
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getConditions());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Helmet>
                <title>Conditions générales | Les Achats Industriels</title>
                <meta name="description" content='Conditions générales ' />
                <meta property="og:title" content="Conditions générales | Les Achats Industriels" />
                <meta property="og:description" content='' />
            </Helmet>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-16 sm:p-24 ",
                    content: "flex min-h-full",
                    leftSidebar: "w-256 border-0 sticky top-0",
                    header: "h-40 min-h-40"
                }}
                header={
                    <HeaderCondition pageLayout={pageLayout} />
                }
                content={
                    <div className="flex flex-col w-full items-center">
                        <CondtionDetail/>
                    
                    </div>
                }
                leftSidebarContent={
                    <ConditionsSidebarContent />
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>
    )
}

export default withReducer('conditionsApp', reducer)(ConditionsApp);
