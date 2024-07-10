import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch,useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import VillesList from './VillesList';
import VillesHeader from './VillesHeader';
import VillesDialog from './VillesDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";


function VillesApp(props)
{
    const dispatch = useDispatch();
    const parametres = useSelector(({villesApp}) => villesApp.villes.parametres);

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getVilles(parametres));
    }, [dispatch,parametres]);

    return (
        <React.Fragment>
             <Helmet>
                <title>Villes | Les Achats Industriels</title>
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
                    <VillesHeader pageLayout={pageLayout}/>
                }
                content={
                    <VillesList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <VillesDialog/>
        </React.Fragment>
    )
}

export default withReducer('villesApp', reducer)(VillesApp);
