
import React from 'react';
import { authRoles } from 'app/auth';

export const childsConfigs = {
    settings: {
        layout: {}
    },
    auth: authRoles.admin,
    routes: [
        {
            path: '/provisoire_founrisseur',
            component: React.lazy(() => import('./childs/Childs'))
        }
    ]
};
