import React from 'react';

export const CommandesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/admin/abonnement/commandes',
            exact : true,
            component: React.lazy(() => import('./CommandesApp'))
        }
    ]
};
