import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ActualitesTable from './ActualitesTable';
import ActualitesHeader from './ActualitesHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Actualites()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ actualiteApp }) => actualiteApp.actualites.parametres);
    
    
    useEffect(() => {
        dispatch(Actions.getActualites(parametres));
        return ()=>{
            dispatch(Actions.cleanUp())
        }
        
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ActualitesHeader/>
            }
            content={
                <ActualitesTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('actualiteApp', reducer)(Actualites);
