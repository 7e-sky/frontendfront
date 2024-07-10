
import React from 'react';
import { authRoles } from 'app/auth';

export const childsConfigs = {
    settings: {
        layout: {}
    },
    auth: authRoles.fournisseur,
    routes: [
        {
            path: '/tentatives',
            component: React.lazy(() => import('./childs/Childs'))
        }
    ]
};
