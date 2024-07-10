import React from 'react';
import { Icon,  Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function CommandesHeader(props) {
    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">control_point_duplicate</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Liste des commandes</Typography>
                </FuseAnimate>
            </div>

        </div>


    );
}

export default CommandesHeader;
