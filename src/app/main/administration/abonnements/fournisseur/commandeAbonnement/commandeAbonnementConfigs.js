
import React from 'react';
import {authRoles} from 'app/auth';

export const commandeAbonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/admin/offres/commande/:commandeId/',
            component: React.lazy(() => import('./commandeAbonnement/Commande'))
        },
        {
            path     : '/admin/offres/commande',
            component: React.lazy(() => import('./commandesAbonnement/Commandes'))
        }
    ]
};
