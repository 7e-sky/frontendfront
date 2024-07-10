import React from 'react';
import { authRoles } from 'app/auth';

export const CommandesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.fournisseur,
    routes: [
        {
            path: '/abonnement/commandes/:open?',
            component: React.lazy(() => import('./CommandesApp'))
        }
    ]
};
