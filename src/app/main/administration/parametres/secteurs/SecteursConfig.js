
import React from 'react';
import {authRoles} from 'app/auth';

export const SecteursConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/parametres/secteurs/:secteurId/',
            component: React.lazy(() => import('./secteur/Secteur'))
        },
        {
            path     : '/parametres/secteurs',
            component: React.lazy(() => import('./secteurs/Secteurs'))
        }
    ]
};
