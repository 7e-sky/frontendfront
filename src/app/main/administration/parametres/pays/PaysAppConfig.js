import React from 'react';

export const PaysAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/pays',
            component: React.lazy(() => import('./PaysApp'))
        }
    ]
};
