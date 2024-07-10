import React from 'react';
import {  Icon, Typography,Button } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import {Link} from 'react-router-dom';

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
                <Button component={Link} to="/offres/commande/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Ajouter nouvelle commande</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
           
        </div>
    );
}

export default AbonnementsHeader;
