import React from 'react';
import { authRoles } from 'app/auth';

export const BillingAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.fournisseur,
    routes: [
        {
            path: '/billing/:tab?',
            component: React.lazy(() => import('./BillingApp'))
        }
    ]
};
