import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import MotifsList from './MotifsList';
import MotifsHeader from './MotifsHeader';
import MotifsDialog from './MotifsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";


function MotifsApp(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getMotifs());
    }, [dispatch]);

    return (
        <React.Fragment>
             <Helmet>
                <title>Motifs | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <MotifsHeader pageLayout={pageLayout}/>
                }
                content={
                    <MotifsList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <MotifsDialog/>
        </React.Fragment>
    )
}

export default withReducer('motifsApp', reducer)(MotifsApp);
