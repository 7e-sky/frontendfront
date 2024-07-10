import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function ConsultationsHeader(props) {
   
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">move_to_inbox</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Vos consultations</Typography>
                </FuseAnimate>
            </div>


        </div>
    );
}

export default ConsultationsHeader;
