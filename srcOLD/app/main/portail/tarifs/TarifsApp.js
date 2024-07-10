import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import TarifDetail from "./TarifDetail";
import HeaderTarif from "./HeaderTarif";
import clsx from "clsx";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight      : '100%',
    position: "relative",
    flex: "1 0 auto",
    height: "auto",
    backgroundColor: theme.palette.background.default,
  },
  middle: {
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    position: "relative",
    marginBottom: theme.spacing(4),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  header: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    position: "relative",
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    backgroundImage: "url(https://source.unsplash.com/collection/9804105)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));

function TarifsApp(props) {
  const classes = useStyles();
  //   const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(Actions.getTarifs());
  //}, [dispatch]);

  return (
    <div
      className={clsx(
        classes.root,
        props.innerScroll && classes.innerScroll,
        "min-h-md"
      )}
    >
      <Helmet>
        <title>Tarifs | Les Achats Industriels</title>
        <meta
          name="description"
          content="Tarifs abonnements et jetons pour les fournisseurs, et Acheteur"
        />
      </Helmet>
      <div
        className={clsx(
          classes.middle,
          "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 "
        )}
      >
        <Grid
          container
          className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999"
        >
          <Grid item sm={12} xs={12}>
            <HeaderTarif {...props} />
          </Grid>
        </Grid>
      </div>

      <TarifDetail {...props} />
    </div>
  );
}

//export default withReducer('tarifsApp', reducer)(TarifsApp);
export default TarifsApp;
