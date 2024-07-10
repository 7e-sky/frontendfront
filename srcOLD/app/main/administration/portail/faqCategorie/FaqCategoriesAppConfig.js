import React from 'react';

export const FaqCategoriesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/admin/faqCategories',
            component: React.lazy(() => import('./FaqCategoriesApp'))
        }
    ]
};
