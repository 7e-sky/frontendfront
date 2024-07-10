import React, { useEffect, useState } from 'react';
import { Chip, Button, Icon, Typography, Box } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { makeStyles, withStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);
const useStyles = makeStyles(theme => ({
    chip1: {
        padding: 2,
        background: '#e3342f',
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20
    },

    chip2: {
        padding: 2,
        background: '#4caf50',
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20
    },

}));
function ProduitsHeader(props) {

    const abonnement = useSelector(({ auth }) => auth.user.abonnement);
    const [abonnee, setAbonnee] = useState(false);
    const nbImages = useSelector(({ produitsFournisseursApp }) => produitsFournisseursApp.produits.nbImages);
    const classes = useStyles(props);
    const loading = useSelector(({ produitsFournisseursApp }) => produitsFournisseursApp.produits.loading);
    const loadingFree = useSelector(({ produitsFournisseursApp }) => produitsFournisseursApp.produits.loadingFree);


    useEffect(() => {

        if (abonnement) {
            let days = moment(abonnement.expired).diff(moment(), 'days');
            if (abonnement.statut && days > 0) {
                //abonnement en cours
                setAbonnee(true);
            }
        }
    }, [abonnement]);

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex flex-col min-w-0">
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">shopping_cart</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">Vos Produits / Services</Typography>
                    </FuseAnimate>
                </div>

                {

                    !abonnee &&
                    (!loadingFree ?
                        <Box display="flex" alignItems="center">
                            <Box minWidth={35}>
                                <Icon>image</Icon>
                            </Box>
                            <Box width="100%" mr={1}>
                                <BorderLinearProgress variant="determinate" value={(nbImages / 5) * 100} />
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">
                                    {`${nbImages}/5`}
                                </Typography>
                            </Box>
                        </Box>
                        : 'Chargement...')
                }
            </div>


            <div className="flex flex-1 items-center justify-center px-12">


            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/produits/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Ajouter nouveau produit / service</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>

        </div>
    );
}

export default ProduitsHeader;
