import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Chip, Typography, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },


}));

function HeaderContentList(props) {
    const classes = useStyles();
    const totalItems = useSelector(({ demandesAchat }) => demandesAchat.demandes.totalItems);
    const parametres = useSelector(({ demandesAchat }) => demandesAchat.demandes.parametres);
    const loading = useSelector(({ demandesAchat }) => demandesAchat.demandes.loading);
    const dispatch = useDispatch();


    function handleChangeRange(ev) {
        parametres.page = 1;
        parametres.filter.id = ev.target.value;
        dispatch(Actions.setParametresData(parametres))
    }
    return (

        <div className="flex justify-between">
            <div>
                {
                    loading ? '' : <Chip label={totalItems + ' Demande(s) trouvé(s)'} color="primary" className={classes.chip} />
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
                    <option value='budget-asc'>Budget les plus bas en premier</option>
                    <option value='budget-desc'>Budget les plus hauts en premier</option>
                </Select>
            </div>
        </div>

    )
}

export default HeaderContentList;