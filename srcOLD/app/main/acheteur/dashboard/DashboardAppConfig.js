import React from 'react';
import {authRoles} from 'app/auth';

export const DashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.acheteur,
    routes  : [
        {
            path     : '/dashboard_ac',
            component: React.lazy(() => import('./DashboardApp'))
        }
    ]
};
