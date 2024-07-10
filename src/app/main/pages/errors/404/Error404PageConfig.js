import React from 'react';

export const Error404PageConfig = {
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
            path     : '/pages/errors/error-404',
            component: React.lazy(() => import('./Error404Page'))
        }
    ]
};
