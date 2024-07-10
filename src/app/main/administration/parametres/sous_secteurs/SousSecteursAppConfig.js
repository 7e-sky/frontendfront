import React from 'react';

export const SousSecteursAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/sous_secteurs',
            component: React.lazy(() => import('./SousSecteursApp'))
        }
    ]
};
