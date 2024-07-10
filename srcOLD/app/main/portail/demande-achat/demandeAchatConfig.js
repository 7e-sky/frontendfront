import React from 'react';

export const demandeAchatConfig = {
    settings: {
        layout: {
            style : 'layout3',
            config: {
                mode   : 'container',
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: true
                },
                footer : {
                    display: true,
                    style  : 'static'
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        },
        theme           : {
            main   : 'greeny',
        },
    },
   
    routes  : [
        {
            path: '/demandes-achat/:id-:slug',
            exact: true,
            component: React.lazy(() => import('./demande/DemandeAchat'))
        },
       {
            path: '/demandes-achats/:secteur?/:activite?/:categorie?',
            exact: true,
            component: React.lazy(() => import('./demandes/DemandesAchatsApp'))
        }
    ]
};

