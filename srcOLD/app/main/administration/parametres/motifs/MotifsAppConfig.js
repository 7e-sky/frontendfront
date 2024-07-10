import React from 'react';

export const MotifsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/motifs',
            component: React.lazy(() => import('./MotifsApp'))
        }
    ]
};
