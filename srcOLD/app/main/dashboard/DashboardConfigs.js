
import React from 'react';
import {authRoles} from 'app/auth';

export const DashboardConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.registe,
    routes  : [
        {
            path     : '/dashboard',
            component: React.lazy(() => import('./Dashboard'))
        },
       
    ]
};
