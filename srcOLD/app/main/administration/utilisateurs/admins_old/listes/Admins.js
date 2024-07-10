import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import AdminsTable from './AdminsTable';
import AdminsHeader from './AdminsHeader';
import reducer from '../store/reducers';

function Admins()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <AdminsHeader/>
            }
            content={
                <AdminsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('adminsApp', reducer)(Admins);
