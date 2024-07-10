import React from 'react';

export const AdminsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users/admin',
            component: React.lazy(() => import('./AdminsApp'))
        }
    ]
};
