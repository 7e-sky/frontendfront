
import React from 'react';
import {authRoles} from 'app/auth';

export const demandeConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/demandes_prix/:demandeId/',
            component: React.lazy(() => import('./demande/Demande'))
        },
        {
            path     : '/demandes_prix',
            component: React.lazy(() => import('./demandes/Demandes'))
        }
    ]
};
