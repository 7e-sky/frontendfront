import React from 'react';

export const FournisseurConfig = {
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
            path: '/entreprise/:id-:slug/:tab?',
            exact: true,
            component: React.lazy(() => import('./ficheFournisseur/FicheFournisseurApp'))
        },
        {
            path: '/entreprises/:secteur?/:activite?/:categorie?',
            exact: true,
            component: React.lazy(() => import('./fournisseurs/FournisseursApp'))
        }
    ]
};

