import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { FuseAnimate, FuseAnimateGroup, LOCAL_CURRENCY } from "@fuse";
import PricingFournisseur from "./PricingFournisseur";
import PricingAcheteur from "./PricingAcheteur";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  header: {
    height: 450,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: "white",
  },
}));
function TarifDetail(props) {
  const classes = useStyles();
  const [currency, setCurrency] = useState(0);
  function handleChangeCurrency(currencyValue) {
    setCurrency(currencyValue);
  }
  return (
    <div>
      <div className={clsx(classes.header, "flex")}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-40 mx-24">
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Typography
                variant="h1"
                color="inherit"
                className="font-bold uppercase text-24 sm:text-32 md:text-44 "
              >
                Tarif Fournisseur
              </Typography>
            </FuseAnimate>

            <FuseAnimate duration={400} delay={600}>
              <Typography
                variant="subtitle1"
                color="inherit"
                className="opacity-75 mt-16 text-13 sm:text-18 mx-auto max-w-512"
              >
                Votre place de marché{" "}
                <span className=" italic font-bold uppercase">B2B</span> la plus
                adapté à vos besoin avec une tarification simple et abordable.
                <br /> Vous pouvez toujours essayer un plan gratuit!
              </Typography>
            </FuseAnimate>
            <FuseAnimateGroup
              enter={{
                animation: "transition.expandIn",
              }}
              duration={400}
              delay={600}
              className="mt-16"
            >
              <Button
                variant={currency === 0 ? "contained" : "outlined"}
                color="secondary"
                className="mr-16"
                onClick={() => handleChangeCurrency(0)}
              >
                {LOCAL_CURRENCY}
              </Button>
              <Button
                color="secondary"
                onClick={() => handleChangeCurrency(1)}
                variant={currency === 0 ? "outlined" : "contained"}
              >
                $
              </Button>
            </FuseAnimateGroup>
          </div>
        </div>
      </div>
      <PricingFournisseur currency={currency} />
      <PricingAcheteur currency={currency} />
    </div>
  );
}

export default React.memo(TarifDetail);
