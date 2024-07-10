import React from "react";
import {
  Grid,
  InputAdornment,
  IconButton,
  Icon,
  Typography,
  Chip,
  Box,
} from "@material-ui/core";
import Formsy from "formsy-react";
import { SelectReactFormsy, TextFieldFormsy } from "@fuse";
import { makeStyles, withStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);
const useStyles = makeStyles((theme) => ({
  border: {
    borderLeft: "11px solid " + theme.palette.secondary.main + "!important",
    paddingLeft: 11,
  },
}));

function Activites(props) {
  const classes = useStyles();
  const {
    commande,
    selected,
    handleChipChange,
    handleDeleteActivite,
    handleAddSuggestion,
    handleChangeAutre,
  } = props;

  return (
    <Formsy>
      {selected.offre && (
        <Box
          display="flex"
          alignItems="center"
          width="50%"
          className="mb-16 m-auto"
        >
          <Box minWidth={45}>Activités</Box>
          <Box width="100%" mr={1} ml={1}>
            <BorderLinearProgress
              variant="determinate"
              value={
                ((selected.sousSecteurs.length + selected.suggestions.length) /
                  selected.offre.nbActivite) *
                100
              }
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {`${selected.sousSecteurs.length + selected.suggestions.length}/${
                selected.offre.nbActivite
              }`}
            </Typography>
          </Box>
        </Box>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <SelectReactFormsy
            id="secteurs"
            name="secteurs"
            value={selected.secteur}
            placeholder="Sélectionner.. "
            textFieldProps={{
              label: "Secteurs",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            className="mb-16 z-50"
            options={commande.secteurs}
            isLoading={commande.loadingSecteurs}
            onChange={(value) => handleChipChange(value, "secteurs")}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectReactFormsy
            id="activites"
            name="activites"
            value=""
            placeholder="Sélectionner.. "
            textFieldProps={{
              label: "Activités",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            className="z-9999"
            options={commande.sousSecteurs}
            isLoading={commande.loadingSS}
            onChange={(value) => handleChipChange(value, "activites")}
            required
          />
          {selected.showAutre ? (
            <TextFieldFormsy
              className="mt-16 w-full"
              type="text"
              name="autreActivite"
              value={selected.autreActivite}
              onChange={handleChangeAutre}
              label="Autre Activité"
              validations={{
                minLength: 2,
                maxLength: 50,
              }}
              validationErrors={{
                minLength: "La longueur minimale de caractère est 2",
                maxLength: "La longueur maximale de caractère est 50",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      disabled={
                        !selected.autreActivite ||
                        selected.autreActivite.length < 2
                      }
                      onClick={(ev) =>
                        handleAddSuggestion(selected.autreActivite)
                      }
                    >
                      <Icon>add_circle</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4} className="items-start">
        <Grid item xs={12} sm={6}>
          <Typography className="mb-16" variant="h6">
            <span className={classes.border}>Activités choisies</span>
          </Typography>
          {selected.sousSecteurs.map((item) => (
            <Chip
              key={item.value}
              color="secondary"
              label={item.label}
              onDelete={() => handleDeleteActivite(item.value, "sousSecteurs")}
              className="mr-8 mb-8"
            />
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="mb-16" variant="h6">
            <span className={classes.border}>Activités suggérées</span>
          </Typography>
          {selected.suggestions.map((item, index) => (
            <Chip
              key={item.sousSecteur}
              color="secondary"
              label={`${item.secteur.label} : ${item.sousSecteur}`}
              onDelete={() =>
                handleDeleteActivite(item.sousSecteur, "suggestions")
              }
              className="mr-8 mb-8"
            />
          ))}
        </Grid>
      </Grid>
    </Formsy>
  );
}

export default Activites;
