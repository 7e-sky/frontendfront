import React from 'react';
import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.secondary.dark, 0.5) + ' 0%, ' + theme.palette.secondary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    }
}));

function MailConfirmPage() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32">

                            <div className="m-32">
                                <Icon className="text-96" color="action">email</Icon>
                            </div>

                            <Typography variant="h5" className="text-center mb-16">Confirmez votre adresse email!</Typography>

                            <Typography className="text-center mb-16 w-full" color="textSecondary">
                                Un e-mail de confirmation a été envoyé à votre adresse e-mail
                            </Typography>

                            <Typography className="text-center w-full" color="textSecondary">
                                Vérifiez votre boîte de réception et cliquez sur le lien "Confirmer mon e-mail" pour confirmer votre adresse e-mail.
                            </Typography>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Link className="font-medium text-blue" to="/">Retour à la page d'accueil </Link>
                            </div>


                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default MailConfirmPage;
