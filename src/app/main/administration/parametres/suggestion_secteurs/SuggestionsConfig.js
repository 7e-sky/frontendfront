
import React from 'react';
import {authRoles} from 'app/auth';

export const SuggestionsConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/parametres/suggestions/:suggestionId/',
            component: React.lazy(() => import('./suggestion/Suggestion'))
        },
        {
            path     : '/parametres/suggestions',
            component: React.lazy(() => import('./suggestions/Suggestions'))
        }
    ]
};
