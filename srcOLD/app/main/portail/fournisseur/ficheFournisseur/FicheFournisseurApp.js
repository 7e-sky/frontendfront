import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import FicheFournisseur from './FicheFournisseur';
import HeaderFicheFournisseur from './HeaderFicheFournisseur';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import ContactFournisseurDialog from './ContactFournisseurDialog';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // minHeight      : '100%',
        position: 'relative',
        flex: '1 0 auto',
        height: 'auto',
        backgroundColor: theme.palette.background.default
    },
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    grid: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    }
}));

function FicheFournisseurApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.parametres);
    const params = props.match.params;
    const { id, tab } = params;

    useEffect(() => {
        function updateFournisseurState() {
            dispatch(Actions.getFournisseur(id));
        }
        updateFournisseurState();
        return () => {
            dispatch(Actions.cleanUpFrs())
        }
    }, [dispatch, id]);

    useEffect(() => {

        if (tab) {
            return;
        }
        function updateFournisseurState() {
            dispatch(Actions.getFournisseurProduitsApercu(id));
        }
        updateFournisseurState();

        return () => {
            dispatch(Actions.cleanUpPrdApercu())
        }
    }, [dispatch, tab, id]);

    useEffect(() => {
        if (!tab) {
            return;
        }

        function updateFournisseurState() {
            dispatch(Actions.getFournisseurProduits(id, parametres));
        }
        updateFournisseurState();
        return () => {
            dispatch(Actions.cleanUpPrds())
        }
    }, [dispatch, tab, id, parametres]);



    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container spacing={2}
                    classes={{
                        'spacing-xs-2': classes.grid
                    }}
                    className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderFicheFournisseur {...props} />
                    </Grid>
                </Grid>
            </div>
            <FicheFournisseur {...props} />
            <ContactFournisseurDialog />
        </div>


    )
}

export default withReducer('fournisseursApp', reducer)(FicheFournisseurApp);