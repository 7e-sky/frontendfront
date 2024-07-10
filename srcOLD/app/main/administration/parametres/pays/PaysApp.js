import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch,useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import PaysList from './PaysList';
import PaysHeader from './PaysHeader';
import PaysDialog from './PaysDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";

function PaysApp(props)
{
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const parametres = useSelector(({paysApp}) => paysApp.pays.parametres);

    useEffect(() => {
        dispatch(Actions.getPays(parametres));
    }, [dispatch,parametres]);

    return (
        <React.Fragment>
             <Helmet>
                <title>Pays | Les Achats Industriels</title>
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
                    <PaysHeader pageLayout={pageLayout}/>
                }
                content={
                    <PaysList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <PaysDialog/>
        </React.Fragment>
    )
}

export default withReducer('paysApp', reducer)(PaysApp);
