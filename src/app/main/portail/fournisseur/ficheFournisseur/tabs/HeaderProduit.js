import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Chip, Typography, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },
}));

function HeaderProduit(props) {
    const classes = useStyles();
    const totalItems = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.totalItems);
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.parametres);
    const loadingProduits = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.loadingProduits);
    const dispatch = useDispatch();

    function handleChangeRange(ev) {
        parametres.page = 1;
        parametres.filter.id = ev.target.value;
        dispatch(Actions.setParametresData(parametres))
    }
    return (

        <>
            {
                totalItems > 0 &&
                <div className="flex justify-between">
                    <div>
                        {
                            loadingProduits ? '' : <Chip label={totalItems + ' produit(s) trouvé(s)'} color="primary" className={classes.chip} />
                        }

                    </div>
                    <div className="flex items-center justify-between ">
                        <Typography className="text-13 mr-16">Résultats triés par</Typography>

                        <Select
                            className="text-13"
                            native
                            value={parametres.filter.id}
                            onChange={handleChangeRange}
                            inputProps={{
                                name: 'currentRange'
                            }}
                        >

                            <option value='created-desc'>Plus récent</option>
                            <option value='created-asc'>Plus ancien </option>
                            <option value='pu-asc'>Prix les plus bas en premier</option>
                            <option value='pu-desc'>Prix les plus hauts en premier</option>
                        </Select>
                    </div>
                </div>
            }
        </>


    )
}

export default HeaderProduit;