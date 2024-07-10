import React from 'react';
import {authRoles} from 'app/auth';

export const DashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/mydashboard',
            component: React.lazy(() => import('./DashboardApp'))
        }
    ]
};
