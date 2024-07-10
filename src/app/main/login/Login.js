import React from 'react'
import { Card, CardContent, Typography, Icon } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate, FuseSplashScreen } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
}));

function Login() {
    const classes = useStyles();
    const login = useSelector(({ auth }) => auth.login);

    if (login.relogin) {
        return <FuseSplashScreen />
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>
            <Helmet>
                <title>Connectez-vous | Les Achats Industriels</title>
                <meta name="description" content="Connectez-vous à votre compte" />
            </Helmet>
            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/icon.png" alt="logo" />
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        LES ACHATS INDUSTRIELS
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        LA PLACE DE MARCHE B TO B N° 1 AU MAROC, DES ACHETEURS ET FOURNISSEURS AVERTIS.
                    </Typography>
                </FuseAnimate>


            </div>

            <FuseAnimate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">CONNECTEZ-VOUS À VOTRE COMPTE</Typography>


                        <JWTLoginTab />


                        <div className="flex flex-col items-center justify-center pt-32">

                            <span className="font-medium">Vous n'avez pas de compte?</span>
                            <Link className="font-medium mt-8 text-blue" to="/register/1">Créez un compte Fournisseur</Link>
                            <Link className="font-medium mt-8 text-blue" to="/register/2">Créez un compte Acheteur</Link>
                            <Link className="font-medium mt-8 flex items-end text-blue" to="/"><Icon className="mr-4">home</Icon>Accueil</Link>

                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Login;
