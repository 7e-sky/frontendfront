import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import DetailProduit from './DetailProduit';
import HeaderDetailProduit from './HeaderDetailProduit';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import DemandeDevisDialog from './DemandeDevisDialog';

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

}));

function DetailProduitApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {

        function updateProduitState() {
            const params = props.match.params;

            const { id } = params;
            dispatch(Actions.getProduit(id));

        }

        updateProduitState();
    }, [dispatch, props.match.params]);


    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, 'min-h-md')}>
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderDetailProduit {...props} />
                    </Grid>
                </Grid>
            </div>
            <DetailProduit {...props} />
            <DemandeDevisDialog />
        </div>


    )
}

export default withReducer('produitsApp', reducer)(DetailProduitApp);