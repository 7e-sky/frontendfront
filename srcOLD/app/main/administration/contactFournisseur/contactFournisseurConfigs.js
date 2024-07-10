
import React from 'react';
import {authRoles} from 'app/auth';

export const contactFournisseurConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/contact_fournisseur/:messageId/',
            component: React.lazy(() => import('./contact_fournisseur/ContactFournisseur'))
        },
        {
            path     : '/contact_fournisseur',
            component: React.lazy(() => import('./contacts_fournisseur/ContactsFournisseur'))
        }
    ]
};
