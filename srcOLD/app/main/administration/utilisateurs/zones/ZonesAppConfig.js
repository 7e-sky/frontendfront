import React from 'react';

export const ZonesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users/zones',
            component: React.lazy(() => import('./ZonesApp'))
        }
    ]
};
