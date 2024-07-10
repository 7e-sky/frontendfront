
import React from 'react';
import { authRoles } from 'app/auth';

export const ProfileConfigs = {
    settings: {
        layout: {}
    },
    auth: authRoles.fournisseur,
    routes: [
        {
            path: '/user/profile/:tab?',
            component: React.lazy(() => import('./Profile'))
        },

    ]
};
