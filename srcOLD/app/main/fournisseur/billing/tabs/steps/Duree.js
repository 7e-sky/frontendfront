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

function Duree(props) {
  const {
    durees,
    loading,
    selected,
    onChange,
    handleGetMontantPerMonth,
    handlegetMontantPerYear,
  } = props;
  const classes = useStyles();

  function financial(x) {
    return parseFloat(x).toLocaleString("fr", { minimumFractionDigits: 2 });
  }
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-200 ">
        <CircularProgress color="secondary" /> &ensp; Chargement ...
      </div>
    );
  }
  return (
    <div className="md:px-44 mt-16">
      <Grid container spacing={4}>
        {durees &&
          durees.map((item) => (
            <Grid item xs={12} key={item["@id"]} md={6}>
              <div
                onClick={() => onChange(item)}
                className={clsx(
                  "rounded rounded-md relative flex items-center justify-center p-24 h-200 w-full border-solid border-4 cursor-pointer hover:border-blue",
                  selected.duree &&
                    (selected.duree["@id"] === item["@id"]
                      ? " border-blue"
                      : " border-gray-400")
                )}
              >
                <div className="mr-16">
                  {selected.duree &&
                    (selected.duree["@id"] === item["@id"] ? (
                      <Icon color="secondary">radio_button_checked</Icon>
                    ) : (
                      <Icon>radio_button_unchecked</Icon>
                    ))}
                </div>
                <div className="flex flex-col items-start">
                  <div className="font-bold uppercase text-20 mb-6">
                    {item.name} mois
                  </div>
                  <div className="font-bold">
                    {financial(handleGetMontantPerMonth(item))}
                    {selected.currency === LOCAL_CURRENCY ? ` ${LOCAL_CURRENCY} HT ` : " $ "}
                    par mois
                  </div>
                  <Typography variant="caption">
                    {financial(handlegetMontantPerYear(item))}
                    {selected.currency === LOCAL_CURRENCY
                      ? ` ${LOCAL_CURRENCY} HT  par an`
                      : " $ par an"}
                  </Typography>
                </div>
                {item.remise ? (
                  <div
                    className={clsx(
                      "absolute px-10 py-2 rounded rounded-md",
                      classes.remise
                    )}
                  >
                    Economiser {item.remise} %
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Duree;
