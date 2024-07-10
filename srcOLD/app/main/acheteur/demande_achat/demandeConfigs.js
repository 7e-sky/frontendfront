
import React from 'react';
import {authRoles} from 'app/auth';

export const demandeConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.acheteur,
    routes  : [
        {
            path     : '/demandes/:demandeId/',
            component: React.lazy(() => import('./demande/Demande'))
        },
        {
            path     : '/demandes',
            component: React.lazy(() => import('./demandes/Demandes'))
        }
    ]
};
