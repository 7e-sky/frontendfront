import React from 'react';
import {  Icon, Typography, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { FuseAnimate } from '@fuse';

function AbonnementsHeader(props) {
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">cloud</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Abonnements</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

               

            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/admin/offres/abonnement/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Ajouter nouveau abonnement</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
        </div>
    );
}

export default AbonnementsHeader;
