
import React from 'react';
import {authRoles} from 'app/auth';

export const commandeAbonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/offres/commande/:commandeId/',
            exact : true,
            component: React.lazy(() => import('./commandeAbonnement/Commande'))
        }
    ]
};
