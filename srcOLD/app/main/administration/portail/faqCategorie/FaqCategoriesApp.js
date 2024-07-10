import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import FaqCategoriesList from './FaqCategoriesList';
import FaqCategoriesHeader from './FaqCategoriesHeader';
import FaqCategoriesDialog from './FaqCategoriesDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';


function FaqCategoriesApp(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getFaqCategories());
    }, [dispatch]);

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <FaqCategoriesHeader pageLayout={pageLayout}/>
                }
                content={
                    <FaqCategoriesList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <FaqCategoriesDialog/>
        </React.Fragment>
    )
}

export default withReducer('faqCategorieApp', reducer)(FaqCategoriesApp);
