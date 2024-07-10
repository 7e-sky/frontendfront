import React from 'react';

export const faqsConfig = {
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
             path: '/faqs',
             exact: true,
             component: React.lazy(() => import('./FaqsApp'))
        }
    ]
};

