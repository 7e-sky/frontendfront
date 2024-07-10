import React from 'react';

export const VillesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/villes',
            component: React.lazy(() => import('./VillesApp'))
        }
    ]
};
