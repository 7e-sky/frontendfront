import React from 'react';
import ProduitListItem from './ProduitListItem';
import HeaderProduit from './HeaderProduit';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";


function Produits(props) {
    const data = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.data);

    return (
        <div className="flex flex-col p-20">
             {
                data &&
                <Helmet>
                    <title>{'Les produits de la société ' + data.societe}</title>
                    <meta name="description" content={data.description} />
                    <meta property="og:title" content={'Les produits de la société ' + data.societe} />
                    <meta property="og:description" content={data.description} />
                </Helmet>
               
            }
            <Typography variant="h6" gutterBottom>
                {data && 'Les produits de la société ' + data.societe}
            </Typography>
            <HeaderProduit />
            <ProduitListItem />
        </div>
    );
}

export default React.memo(Produits);
