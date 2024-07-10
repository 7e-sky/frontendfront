import React from 'react';

export const SecteursAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/secteurs',
            component: React.lazy(() => import('./SecteursApp'))
        }
    ]
};
