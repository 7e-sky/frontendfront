
import React from 'react';
import {authRoles} from 'app/auth';

export const demandeDevisConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/product_devis/:demandeId/',
            component: React.lazy(() => import('./demande_devis/DemandeDevis'))
        },
        {
            path     : '/product_devis',
            component: React.lazy(() => import('./demandes_devis/DemandesDevis'))
        }
    ]
};
