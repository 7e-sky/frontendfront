import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import FournisseursTable from './FournisseursTable';
import FournisseursHeader from './FournisseursHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Fournisseurs()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.parametres);
    
    
    useEffect(() => {
        dispatch(Actions.getFournisseurs(parametres));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <FournisseursHeader/>
            }
            content={
                <FournisseursTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('fournisseursAdminApp', reducer)(Fournisseurs);
