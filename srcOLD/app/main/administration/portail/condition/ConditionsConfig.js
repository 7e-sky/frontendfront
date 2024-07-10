
import React from 'react';
import {authRoles} from 'app/auth';

export const ConditionsConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/admin/conditions/:conditionId/',
            component: React.lazy(() => import('./condition/Condition'))
        },
        {
            path     : '/admin/conditions',
            component: React.lazy(() => import('./conditions/Conditions'))
        }
    ]
};
