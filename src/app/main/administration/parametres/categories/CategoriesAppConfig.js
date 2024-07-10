import React from 'react';

export const CategoriesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/parametres/categories',
            component: React.lazy(() => import('./CategoriesApp'))
        }
    ]
};
