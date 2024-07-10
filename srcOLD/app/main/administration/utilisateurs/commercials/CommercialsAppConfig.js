import React from 'react';

export const CommercialsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users/commercials',
            component: React.lazy(() => import('./CommercialsApp'))
        }
    ]
};
