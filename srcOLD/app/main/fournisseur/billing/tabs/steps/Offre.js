import React from "react";
import { CircularProgress, Grid, Icon, Typography } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { LOCAL_CURRENCY } from "@fuse";
const useStyles = makeStyles((theme) => ({
  remise: {
    top: "-15px",
    left: 10,
    backgroundColor: "#ecc94b",
    color: "#7b341e",
  },
}));

function Offre(props) {
  const { commande, selected, onChange } = props;
  const classes = useStyles();

  function financial(x) {
    return parseFloat(x).toLocaleString("fr", { minimumFractionDigits: 2 });
  }
  if (commande.loadingOffres) {
    return (
      <div className="flex flex-1 items-center justify-center h-200 ">
        <CircularProgress color="secondary" /> &ensp; Chargement ...
      </div>
    );
  }
  return (
    <div className="md:px-44 mt-16">
      <Grid container spacing={4}>
        {commande.offres &&
          commande.offres.map((item) => (
            <Grid item xs={12} key={item["@id"]} md={4}>
              <div
                onClick={() => onChange(item)}
                className={clsx(
                  "rounded rounded-md relative flex items-center justify-center p-24 h-200 w-full border-solid border-4 cursor-pointer hover:border-blue",
                  selected.offre &&
                    (selected.offre["@id"] === item["@id"]
                      ? " border-blue"
                      : " border-gray-400")
                )}
              >
                <div className="mr-8">
                  {selected.offre &&
                    (selected.offre["@id"] === item["@id"] ? (
                      <Icon color="secondary">radio_button_checked</Icon>
                    ) : (
                      <Icon>radio_button_unchecked</Icon>
                    ))}
                </div>
                <div className="flex flex-col items-start">
                  <div className="font-bold uppercase text-20 mb-6">
                    {item.name}
                  </div>
                  <div className="font-bold">
                    {financial(
                      selected.currency === LOCAL_CURRENCY
                        ? item.prixMad
                        : item.prixEur
                    )}
                    {selected.currency === LOCAL_CURRENCY ?  ` ${LOCAL_CURRENCY} HT `: " $ "}
                    par mois
                  </div>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Offre;
