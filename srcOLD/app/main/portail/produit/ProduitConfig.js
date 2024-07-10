import React from 'react';

export const ProduitConfig = {
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
            path: '/detail-produit/:activite/:categorie/:id-:slug',
            exact: true,
            component: React.lazy(() => import('./detailProduit/DetailProduitApp'))
        },
        {
            path: '/vente-produits/:secteur?/:activite?/:categorie?',
            exact: true,
            component: React.lazy(() => import('./produits/ProduitsApp'))
        }
    ]
};

