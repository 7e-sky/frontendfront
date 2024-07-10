import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Chip, Typography, Select } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },


}));

function HeaderContentList(props) {
    const classes = useStyles();
    const totalItems = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.totalItems);
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.parametres);
    const loading = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.loading);
    const dispatch = useDispatch();
    

    function handleChangeRange(ev){
        parametres.page = 1;
        parametres.filter.id = ev.target.value;
        dispatch(Actions.setParametresData(parametres))
    }
    return (

        <div className="flex justify-between">
            <div>
                {
                    loading ? '' :  <Chip label={totalItems +' fournisseur(s) trouvé(s)'} color="primary" className={classes.chip} />
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
                </Select>
            </div>
        </div>

    )
}

export default HeaderContentList;