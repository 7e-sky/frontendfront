
import React from 'react';

export const adminsConfigs = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/users/admins/:adminId/:adminHandle?',
            component: React.lazy(() => import('./admin/Admin'))
        },
        {
            path: '/users/admins',
            component: React.lazy(() => import('./listes/Admins'))
        }
    ]
};
