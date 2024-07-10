import React from 'react';

export const parcourirSecteursConfig = {
    settings: {
        layout: {
            style: 'layout3',
            config: {
                mode: 'container',
                navbar: {
                    display: false
                },
                toolbar: {
                    display: true
                },
                footer: {
                    display: true,
                    style: 'static'
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        },
        theme: {
            main: 'greeny',
        },
    },

    routes: [
        {
            path     : '/annuaire-entreprises/:secteur/:id-:slug',
            exact    : true,
            component: React.lazy(() => import('./activite/Activite'))
        },
        {
            path     : '/annuaire-entreprises/:id-:slug',
            exact    : true,
            component: React.lazy(() => import('./secteur/Secteur'))
        },
        {
            path     : '/annuaire-entreprises',
            exact    : true,
            component: React.lazy(() => import('./secteurs/Secteurs'))
        },
       
    ]
};

