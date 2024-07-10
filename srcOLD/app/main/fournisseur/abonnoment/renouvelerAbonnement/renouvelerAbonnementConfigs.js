
import React from 'react';
import {authRoles} from 'app/auth';

export const renouvelerAbonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/renouveler/:commandeId/',
            component: React.lazy(() => import('./renouvelerAbonnement/Renouveler')),
            exact: true
        }
    ]
};
