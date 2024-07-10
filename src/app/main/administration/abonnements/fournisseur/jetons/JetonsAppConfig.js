import React from 'react';

export const JetonsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/admin/abonnement/jetons',
            exact : true,
            component: React.lazy(() => import('./JetonsApp'))
        }
    ]
};
