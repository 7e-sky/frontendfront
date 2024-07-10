
import React from 'react';
import {authRoles} from 'app/auth';

export const abonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/abonnement/:abonnementId/',
            component: React.lazy(() => import('./abonnement/Abonnement'))
        },
        {
            path     : '/abonnement',
            component: React.lazy(() => import('./abonnements/Abonnements'))
        }
    ]
};
