import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import AcheteursTable from './AcheteursTable';
import AcheteursHeader from './AcheteursHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Acheteurs()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.parametres);
    
    
    useEffect(() => {
        dispatch(Actions.getAcheteurs(parametres));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <AcheteursHeader/>
            }
            content={
                <AcheteursTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('acheteursAdminApp', reducer)(Acheteurs);
