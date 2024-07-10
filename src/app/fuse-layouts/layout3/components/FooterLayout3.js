import React from 'react';
import { AppBar, Typography, Grid, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FooterLayout3(props) {
    const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar id="fuse-footer" className="relative z-10" color="default">

                <div className="container py-28 px-16 lg:px-24">

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} >
                            <Typography className="uppercase md:mb-10 font-bold" color="primary">
                                à propos de nous
                            </Typography>
                            <Typography className="text-justify">
                                Les Achats Industriels est une place de marché b2b qui permet aux Acheteurs et aux Fournisseurs de se rencontrer dans une même plate-forme (électronique).
                                <br /><br /> Nous nous positionnons en tant qu'intermédiaire entre les deux parties afin de faciliter aux uns et aux autres de vendre ou/et acheter de manière fluide, économique, rapide, sans limites géographiques.
                            </Typography>


                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Typography className="uppercase md:mb-10 font-bold" color="primary">
                                Acheter
                            </Typography>
                            <ul className="list-reset mb-6 p-0">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0  ">
                                    <Link component="true" to="/register/2" className="ml-0 text-blue">Inscrivez-vous comme Acheteur</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/vente-produits" className="ml-0 text-blue">Voir produits</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/login" className="ml-0 text-blue">Demander des devis</Link>

                                </li>

                            </ul>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Typography className="uppercase md:mb-10 font-bold" color="primary">
                                Vendre
                            </Typography>
                            <ul className="list-reset mb-6 p-0">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/register/1" className="ml-0 text-blue">Inscrivez-vous comme Fournisseur</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/conditions" className="ml-0 text-blue">Comment publier sur LesAchatsIndustriels</Link>

                                </li>

                            </ul>
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Typography className="uppercase md:mb-10 font-bold" color="primary">
                                Liens utiles
                            </Typography>
                            <ul className="list-reset mb-6 p-0">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/annuaire-entreprises" className="ml-0 text-blue">Toutes les catégories</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/vente-produits" className="ml-0 text-blue">Tous les produits</Link>

                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/entreprises" className="ml-0 text-blue">Tous les fournisseurs</Link>

                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link component="true" to="/tarifs/plans" className="ml-0 text-blue">Tarifs</Link>

                                </li>
                            </ul>
                        </Grid>
                    </Grid>

                    <Divider className="mt-16" />

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} className="text-center">
                            <div className="mt-16 ">
                                <Link component="true" to="/conditions" className="ml-0 text-blue">Conditions Générales</Link>
                                &ensp;|&ensp;
                                <Link component="true" to="/faqs" className="text-blue">FAQ</Link>
                                &ensp;|&ensp;
                                <Link component="true" to="/tarifs/plans" className="text-blue">Tarifs</Link>

                            </div>
                        </Grid>
                    </Grid>

                </div>
            </AppBar>
        </ThemeProvider>
    );
}

export default FooterLayout3;
