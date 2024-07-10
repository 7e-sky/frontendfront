
import React from 'react';
import {authRoles} from 'app/auth';

export const FaqsConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/admin/faqs/:faqId/',
            component: React.lazy(() => import('./faq/Faq'))
        },
        {
            path     : '/admin/faqs',
            component: React.lazy(() => import('./faqs/Faqs'))
        }
    ]
};
