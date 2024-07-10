
import React from 'react';
import {authRoles} from 'app/auth';

export const consultationConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/consultations/:consultationId/',
            component: React.lazy(() => import('./consultation/Consultation'))
        },
        {
            path     : '/consultations',
            component: React.lazy(() => import('./consultations/Consultations'))
        }
    ]
};
