
import React from 'react';
import {authRoles} from 'app/auth';

export const messagesConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/messages/:messageId/',
            component: React.lazy(() => import('./message/Message'))
        },
        {
            path     : '/messages',
            component: React.lazy(() => import('./messages/Messages'))
        }
    ]
};
