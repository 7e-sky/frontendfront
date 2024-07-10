import React from 'react';
import {authRoles} from 'app/auth';

export const BlackListesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.acheteur,
    routes  : [
        {
            path     : '/blacklistes',
            component: React.lazy(() => import('./BlackListesApp'))
        }
    ]
};
