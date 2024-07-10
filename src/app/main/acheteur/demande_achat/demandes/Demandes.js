import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import DemandesTable from './DemandesTable';
import DemandesHeader from './DemandesHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function Demandes()
{
    
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const parametres = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demandes.parametres);
    
    
    useEffect(() => {
        if(user)
        dispatch(Actions.getDemandes(user.id,parametres));

        return ()=>{
            dispatch(Actions.cleanUp())
        }
        
    }, [dispatch,parametres,user]);

    return (
        <>
          <Helmet>
                <title>Demandes Achats | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <DemandesHeader/>
            }
            content={
                <DemandesTable/>
            }
            innerScroll
        />
        </>
    );
}

export default withReducer('demandesAcheteurApp', reducer)(Demandes);
