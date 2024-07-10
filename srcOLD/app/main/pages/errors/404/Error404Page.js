import React from 'react';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

function Error404Page() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <Helmet>
                <title>404 | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <div className="max-w-512 text-center">

                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <Typography variant="h1" color="inherit" className="font-medium mb-16">
                        404
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={500}>
                    <Typography variant="h5" color="textSecondary" className="mb-16">
                        Désolé mais nous n'avons pas trouvé la page que vous recherchez
                    </Typography>
                </FuseAnimate>


                <Link className="font-medium" to="/">retour à la page d'accueil</Link>
            </div>
        </div>
    );
}

export default Error404Page;
