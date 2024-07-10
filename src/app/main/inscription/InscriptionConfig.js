import React from 'react';


export const InscriptionConfig = {
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
            exact: true,
            path: '/register/confirm/:confirmationToken',
            component: React.lazy(() => import('./ConfirmPage'))
        },
        {
            exact: true,
            path: '/register/:page',
            component: React.lazy(() => import('./RegisterPage'))
        },
        {
            exact: true,
            path: '/mail-confirm',
            component: React.lazy(() => import('./MailConfirmPage'))
        }
    ]
};